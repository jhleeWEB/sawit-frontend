import { getFFmpeg } from "./get-ffmpeg";
import { getVideoMeta } from "./get-video-meta";
import { planTranscode } from "./plan-transcode";
import { fetchFile } from "@ffmpeg/util";

export async function transcodeToTarget(
  file: File,
  targetSize: number
): Promise<File> {
  // 이미 100MB 이하면 그대로 반환
  if (file.size <= targetSize) return file;

  const { duration, width, height } = await getVideoMeta(file);
  const plan = planTranscode(duration, width, height);

  const ffmpeg = await getFFmpeg();
  const inName = "in";
  const inExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
  const inFile = `${inName}.${inExt}`;
  const outFile = "out.mp4";

  ffmpeg.writeFile(inFile, await fetchFile(file));

  // 필터 구성
  const vf = plan.scale ? ["-vf", plan.scale] : [];
  // 1차 시도
  const runOnce = async (videoK: number) => {
    const args: string[] = [
      "-i",
      inFile,
      ...vf, // 예: const vf = plan.scale ? ["-vf", plan.scale] : [];
      "-r",
      "30", // FPS 상한
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-b:v",
      `${videoK}k`,
      "-maxrate",
      `${Math.floor(videoK * 1.15)}k`,
      "-bufsize",
      `${Math.floor(videoK * 2)}k`,
      "-c:a",
      "aac",
      "-b:a",
      `${plan.audioK}k`,
      "-ac",
      "2",
      "-movflags",
      "+faststart",
      outFile,
    ];
    await ffmpeg.exec(args);
    const out = await ffmpeg.readFile(outFile);
    return new File(
      [out],
      file.name.replace(/\.[^./]+$/, "") + "-compressed.mp4",
      {
        type: "video/mp4",
        lastModified: Date.now(),
      }
    );
  };

  // 1차 인코딩
  let output = await runOnce(plan.videoK);
  // 만약 용량이 여전히 크면 2~3회 더 낮춰서 재시도
  let tries = 0;
  while (output.size > targetSize && tries < 2) {
    const ratio = targetSize / output.size; // 필요 비율
    // 비트레이트를 좀 더 과감히 낮춤
    const newVideoK = Math.max(300, Math.floor(plan.videoK * ratio * 0.85));
    output = await runOnce(newVideoK);
    tries++;
  }

  // 정리
  try {
    ffmpeg.unmount(inFile);
  } catch {}
  try {
    ffmpeg.unmount(outFile);
  } catch {}

  return output;
}
