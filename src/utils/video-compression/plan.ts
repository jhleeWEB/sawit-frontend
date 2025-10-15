export function plan(
  duration: number,
  targetSize: number,
  w?: number,
  h?: number
) {
  const safety = 0.98;
  const audioK = 128;
  const totalKbps = (targetSize * safety * 8) / duration / 1000;
  const videoK = Math.max(400, Math.floor(totalKbps - audioK));
  let scale = "";
  const W = w || 1920,
    H = h || 1080;
  if ((W >= 1920 || H >= 1080) && videoK < 6000)
    scale = "scale='min(1280,iw)':-2";
  if ((W >= 1280 || H >= 720) && videoK < 2500)
    scale = "scale='min(960,iw)':-2";
  if (videoK < 1200) scale = "scale='min(640,iw)':-2";
  return { videoK, audioK, scale };
}
