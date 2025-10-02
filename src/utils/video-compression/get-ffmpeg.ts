import { FFmpeg } from "@ffmpeg/ffmpeg";

let _ffmpeg: FFmpeg | null = null;
export async function getFFmpeg() {
  if (_ffmpeg) return _ffmpeg;
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();
  _ffmpeg = ffmpeg;
  return ffmpeg;
}
