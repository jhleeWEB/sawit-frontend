import { canvasToBlob } from "./canvas-to-blob";
import { drawScaled } from "./draw-scale";
import { fileToImageBitmap } from "./file-to-image-bitmap";
import { renameWithExt } from "./rename-with-ext";
import { CompressOptions } from "./types";

export async function compressImageToMaxBytes(
  file: File,
  {
    maxBytes,
    maxWidth = 4096,
    maxHeight = 4096,
    mimeCandidates = ["image/webp", "image/jpeg"],
    qualityStart = 0.92,
  }: CompressOptions
): Promise<File> {
  // 이미 충분히 작으면 그대로 반환
  if (file.size <= maxBytes && file.type.startsWith("image/")) return file;

  const image = await fileToImageBitmap(file);

  // 초기값
  let scale = 1;
  let quality = qualityStart;
  let lastBlob: Blob | null = null;

  // 포맷 후보를 순회하면서 각각에서 여러 번(품질/스케일) 시도
  for (const mime of mimeCandidates) {
    scale = 1;
    quality = qualityStart;
    for (let i = 0; i < 12; i++) {
      const canvas = drawScaled(image, scale, maxWidth, maxHeight);
      try {
        const blob = await canvasToBlob(canvas, mime, quality);
        lastBlob = blob;
        if (blob.size <= maxBytes) {
          return new File([blob], renameWithExt(file.name, mime), {
            type: mime,
            lastModified: Date.now(),
          });
        }
        // 용량 줄이기 전략: 먼저 품질 낮추고, 한계에 오면 스케일 다운
        if (quality > 0.6) {
          quality = Math.max(0.4, quality - 0.08); // 0.92 → 0.84 → 0.76 …
        } else {
          scale = scale * 0.85; // 1 → 0.85 → 0.72 …
          if (scale < 0.35) break; // 너무 작아지는 것 방지
        }
      } catch (e: unknown) {
        // 이 포맷이 브라우저에서 미지원이거나 실패하면 다음 포맷으로
        console.error(e);
        break;
      }
    }
  }

  // 실패 시: 그래도 가장 마지막 결과가 있다면 반환(용량 초과 가능),
  // 또는 원본을 그대로 반환 — 정책에 맞게 선택
  if (lastBlob) {
    return new File(
      [lastBlob],
      renameWithExt(file.name, lastBlob.type || "image/jpeg"),
      {
        type: lastBlob.type || "image/jpeg",
        lastModified: Date.now(),
      }
    );
  }
  return file;
}
