"use client";

import { getMeta } from "@/utils/video-compression/get-meta";
import { plan } from "@/utils/video-compression/plan";
import { FFmpeg, LogEvent, ProgressEvent } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";

export default function useVideoCompression() {
  const [logs, setLogs] = useState("");
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState("");

  const [eta, setEta] = useState("");
  const ffmpegRef = useRef<FFmpeg | null>(null);

  useEffect(() => {
    if (!ffmpegRef.current) ffmpegRef.current = new FFmpeg();
  }, []);

  useEffect(() => {
    const ffmpeg = ffmpegRef.current!;
    const onLog = ({ message }: LogEvent) => {
      // 마지막 몇 줄만
      setLogs((prev) =>
        (prev + "\n" + message).split("\n").slice(-4).join("\n")
      );
    };

    let lastSec = 0;

    const onProgress = ({ progress, time }: ProgressEvent) => {
      // progress: 0~1, time: usec
      const pEnc = Math.max(0, Math.min(1, Number(progress) || 0));
      // stage별 가중치로 전체 % 만들기 (로딩/쓰기/읽기 포함)
      const overall = 0.1 + pEnc * 0.85; // writing=10%, encoding=85%, reading=5%
      setPercent(Math.round(overall * 100));

      const encodedSec = (((Number(time) || 0) / 1_000_000) * 3) / 60;
      if (encodedSec > lastSec) {
        lastSec = encodedSec;
        // ETA 추정 (단순): 남은 비율 * 총길이 / (진행비율 변화속도)
        setEta(
          encodedSec > 0
            ? `~${Math.max(0, Math.round(((1 - pEnc) * encodedSec) / pEnc))}분`
            : "-"
        );
      }
    };
    ffmpeg.on("log", onLog);
    ffmpeg.on("progress", onProgress);
  }, []);

  const start = async (file: File, targetSize: number) => {
    setPercent(3);
    setEta("-");
    const ffmpeg = ffmpegRef.current!;
    setStage("비디오 최적화 준비중!");
    await ffmpeg.load();
    setPercent(8);
    const meta = await getMeta(file);
    const planCfg = plan(meta.duration, targetSize, meta.w, meta.h);

    const inName = `in.${file.name.split(".").pop() || "mp4"}`;
    const outName = "out.mp4";

    setStage("비디오 최적화 시작!");
    await ffmpeg.writeFile(inName, await fetchFile(file));

    const vf = planCfg.scale ? ["-vf", planCfg.scale] : [];
    const args = [
      "-i",
      inName,
      ...vf,
      "-r",
      "30",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-b:v",
      `${planCfg.videoK}k`,
      "-maxrate",
      `${Math.floor(planCfg.videoK * 1.15)}k`,
      "-bufsize",
      `${Math.floor(planCfg.videoK * 2)}k`,
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      `${planCfg.audioK}k`,
      "-ac",
      "2",
      "-movflags",
      "+faststart",
      outName,
    ];

    setStage("비디오 최적화 작업중~");
    await ffmpeg.exec(args);

    setPercent((p) => Math.max(p, 97));

    setStage("비디오 출력중!");
    const data = (await ffmpeg.readFile(outName)) as Uint8Array;
    const ab = data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength
    ) as ArrayBuffer;
    const out = new File(
      [ab],
      file.name.replace(/\.[^.]+$/, "") + "-compressed.mp4",
      {
        type: "video/mp4",
        lastModified: Date.now(),
      }
    );

    // 정리(실패 무시)
    try {
      await ffmpeg.deleteFile(inName);
    } catch {}
    try {
      await ffmpeg.deleteFile(outName);
    } catch {}
    setStage("비디오 최적화 완료!");
    setPercent(100);
    setEta("0s");
    return out;
  };

  return { stage, logs, eta, percent, start };
}
