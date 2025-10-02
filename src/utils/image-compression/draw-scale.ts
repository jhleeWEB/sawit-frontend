export function drawScaled(
  src: ImageBitmap | HTMLImageElement,
  scale: number,
  maxW?: number,
  maxH?: number
): HTMLCanvasElement {
  const sw =
    // @ts-expect-error used unknown
    "width" in src ? (src as unknown).width : (src as unknown).videoWidth;
  const sh =
    // @ts-expect-error used unknown
    "height" in src ? (src as unknown).height : (src as unknown).videoHeight;

  // scale 우선, 그 다음 maxW/H 캡
  let tw = Math.max(1, Math.round(sw * scale));
  let th = Math.max(1, Math.round(sh * scale));

  if (maxW && tw > maxW) {
    const r = maxW / tw;
    tw = Math.round(tw * r);
    th = Math.round(th * r);
  }
  if (maxH && th > maxH) {
    const r = maxH / th;
    tw = Math.round(tw * r);
    th = Math.round(th * r);
  }

  const canvas = document.createElement("canvas");
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  // @ts-expect-error used unknown
  ctx.drawImage(src as unknown, 0, 0, tw, th);
  return canvas;
}
