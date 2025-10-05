import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export async function loadFFmpegCore(
  ffmpeg: FFmpeg,
  base = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.15/dist/umd"
): Promise<void> {
  await ffmpeg.load({
    coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
    // 필요 시: workerURL: await toBlobURL(`${base}/ffmpeg-core.worker.js`, "text/javascript"),
  });
}
