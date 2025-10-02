import { TARGET_BYTES } from "../consts";

// 목표 용량에 맞춰 비트레이트/스케일 결정
export function planTranscode(
  durationSec: number,
  width?: number,
  height?: number
) {
  const safety = 0.98; // 약간 여유
  const audioK = 128; // AAC 128kbps
  const totalKbps = (TARGET_BYTES * safety * 8) / durationSec / 1000; // kbps
  const videoK = Math.max(400, Math.floor(totalKbps - audioK)); // 최소 400kbps는 유지

  // 해상도 다운스케일 결정 (대략적 가이드)
  let scale = ""; // ffmpeg scale 필터
  const w = width || 1920,
    h = height || 1080;

  // 고해상도인데 비디오 비트레이트가 낮으면 스케일 다운
  if ((w >= 1920 || h >= 1080) && videoK < 6000) {
    // 1080p -> 720p
    scale = "scale='min(1280,iw)':-2";
  }
  if ((w >= 1280 || h >= 720) && videoK < 2500) {
    // 720p -> 960x540/854x480 급
    scale = "scale='min(960,iw)':-2";
  }
  if (videoK < 1200) {
    // 더 작은 해상도로
    scale = "scale='min(640,iw)':-2";
  }

  // 버퍼/맥스레이트
  const maxrateK = Math.floor(videoK * 1.15);
  const bufsizeK = Math.floor(videoK * 2.0);

  return { videoK, audioK, maxrateK, bufsizeK, scale };
}
