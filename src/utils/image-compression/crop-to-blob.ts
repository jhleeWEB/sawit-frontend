import { Area } from "react-easy-crop";

export async function cropToBlob(
  imageSrc: string,
  area: Area,
  opts?: {
    mime?: string;
    quality?: number;
    outWidth?: number;
    outHeight?: number;
  }
): Promise<Blob> {
  const {
    mime = "image/jpeg",
    quality = 0.92,
    outWidth,
    outHeight,
  } = opts || {};
  const img = await loadImage(imageSrc);

  const cropCanvas = document.createElement("canvas");
  cropCanvas.width = Math.max(1, Math.round(area.width));
  cropCanvas.height = Math.max(1, Math.round(area.height));
  const ctx = cropCanvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  ctx.drawImage(
    img,
    Math.max(0, Math.round(area.x)),
    Math.max(0, Math.round(area.y)),
    Math.round(area.width),
    Math.round(area.height),
    0,
    0,
    cropCanvas.width,
    cropCanvas.height
  );

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = outWidth || cropCanvas.width;
  finalCanvas.height = outHeight || cropCanvas.height;
  const fctx = finalCanvas.getContext("2d");
  if (!fctx) throw new Error("Canvas 2D context unavailable");
  fctx.imageSmoothingEnabled = true;
  fctx.imageSmoothingQuality = "high";
  fctx.drawImage(cropCanvas, 0, 0, finalCanvas.width, finalCanvas.height);

  return new Promise<Blob>((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Failed to export image"));
        else resolve(blob);
      },
      mime,
      quality
    );
  });
}
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // needed if using remote images with CORS
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
