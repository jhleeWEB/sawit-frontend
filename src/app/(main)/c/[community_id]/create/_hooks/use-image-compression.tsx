"use client";

import { MB } from "@/utils/consts";
import { useEffect, useRef, useState } from "react";

/** 옵션 타입 */
type ImageCompressOptions = {
  /** 목표 용량(bytes). 예: 10 * 1024 * 1024 */
  maxBytes?: number;
  /** 리사이즈 상한 */
  maxWidth?: number;
  maxHeight?: number;
  /** 우선 포맷 (기본 webp, 필요 시 "image/jpeg") */
  format?: "image/webp" | "image/jpeg";
  /** 이진 탐색 반복 상한 */
  maxIterations?: number;
  /** 시작/최소/최대 품질 */
  initialQuality?: number; // 0~1
  minQuality?: number; // 0~1
  maxQuality?: number; // 0~1
};

type UseImageCompression = {
  stage: string;
  logs: string;
  eta: string;
  percent: number;
  /** 파일 1개를 압축 시작 */
  start: (file: File, opts?: ImageCompressOptions) => Promise<File>;
};

/**
 * 이미지 메타 파싱 (가로/세로/타입)
 */
async function getImageMeta(file: File) {
  const url = URL.createObjectURL(file);
  try {
    // createImageBitmap이 빠르고 메모리 효율적
    const bmp = await createImageBitmap(
      await file.arrayBuffer().then((ab) => new Blob([ab], { type: file.type }))
    );
    const meta = { w: bmp.width, h: bmp.height, type: file.type as string };
    bmp.close();
    return meta;
  } catch {
    // 폴백: HTMLImageElement
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    return {
      w: img.naturalWidth,
      h: img.naturalHeight,
      type: file.type as string,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function fitWithin(w: number, h: number, maxW: number, maxH: number) {
  const rw = maxW > 0 ? maxW / w : 1;
  const rh = maxH > 0 ? maxH / h : 1;
  const r = Math.min(1, rw, rh);
  return {
    outW: Math.max(1, Math.floor(w * r)),
    outH: Math.max(1, Math.floor(h * r)),
  };
}

/**
 * 비트맵 생성 (리사이즈)
 */
async function decodeAndResizeToCanvas(
  file: File,
  outW: number,
  outH: number
): Promise<HTMLCanvasElement | OffscreenCanvas> {
  // OffscreenCanvas 우선
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });
  const bmp = await createImageBitmap(blob);

  // OffscreenCanvas가 있으면 사용
  if (typeof OffscreenCanvas !== "undefined") {
    const off = new OffscreenCanvas(outW, outH);
    const ctx = off.getContext("2d", { alpha: true })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, 0, 0, outW, outH);
    bmp.close();
    return off;
  }

  // 폴백: HTMLCanvasElement
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d", { alpha: true })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, 0, 0, outW, outH);
  bmp.close();
  return canvas;
}

/**
 * canvas/offscreencanvas → Blob
 */
function canvasToBlobAny(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  type: string,
  quality: number
): Promise<Blob> {
  if ("convertToBlob" in canvas) {
    // OffscreenCanvas
    return (canvas as OffscreenCanvas).convertToBlob({ type, quality });
  }
  return new Promise<Blob>((resolve, reject) => {
    (canvas as HTMLCanvasElement).toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      type,
      quality
    );
  });
}

/**
 * 주어진 canvas로 목표 용량을 만족하도록 품질 이진 탐색
 */
async function encodeToTargetBytes(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  type: "image/webp" | "image/jpeg",
  targetBytes: number,
  {
    initialQuality = 0.82,
    minQuality = 0.4,
    maxQuality = 0.95,
    maxIterations = 7,
    onIter,
  }: {
    initialQuality?: number;
    minQuality?: number;
    maxQuality?: number;
    maxIterations?: number;
    onIter?: (iter: number, q: number, size: number) => void;
  } = {}
): Promise<{ blob: Blob; quality: number; iterations: number }> {
  // 1) 먼저 초기 품질로 트라이
  let lo = minQuality,
    hi = maxQuality,
    q = Math.min(Math.max(initialQuality, lo), hi);
  let best: { blob: Blob; quality: number } | null = null;

  for (let i = 0; i < maxIterations; i++) {
    const blob = await canvasToBlobAny(canvas, type, q);
    const size = blob.size;
    onIter?.(i, q, size);

    // 목표 만족하면 일단 후보로 저장하고 더 낮은 용량을 노려 품질 조정(여유↑)
    if (size <= targetBytes) {
      best = { blob, quality: q };
      // 조금 올려서 품질 확보
      lo = q;
      q = (q + hi) / 2;
    } else {
      // 크면 품질 내리기
      hi = q;
      q = (q + lo) / 2;
    }

    // 수렴/여유 체크(±2% 이내면 종료)
    const diff = Math.abs(size - targetBytes) / targetBytes;
    if (diff < 0.02) return { blob, quality: q, iterations: i + 1 };
  }

  // 반복 끝났는데도 못맞췄다면, 가능한 최선(best) 반환 or 마지막 시도 반환
  if (best)
    return {
      blob: best.blob,
      quality: best.quality,
      iterations: maxIterations,
    };
  const lastBlob = await canvasToBlobAny(canvas, type, lo);
  return { blob: lastBlob, quality: lo, iterations: maxIterations };
}

/**
 * 비디오 훅과 동일한 UX로 단계/로그/ETA/%를 제공하는 이미지 압축 훅
 */
export default function useImageCompression(): UseImageCompression {
  const [logs, setLogs] = useState("");
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState("");
  const [eta, setEta] = useState("");

  // 진행률 가중치 (비디오 훅과 유사한 비율)
  // reading 5% + decoding 10% + resizing 25% + encoding(이진탐색) 55% + writing 5%
  const weights = useRef({
    read: 0.05,
    decode: 0.1,
    resize: 0.25,
    encode: 0.55,
    write: 0.05,
  });

  // ETA 계산용(단순 추정)
  const t0Ref = useRef<number>(0);
  function updateETA(localProgress: number) {
    const now = performance.now();
    if (!t0Ref.current) t0Ref.current = now;
    const elapsed = (now - t0Ref.current) / 1000; // sec
    if (localProgress <= 0) {
      setEta("-");
      return;
    }
    const remain = (elapsed * (1 - localProgress)) / localProgress;
    setEta(`~${Math.max(0, Math.round(remain))}s`);
  }

  function appendLog(line: string) {
    setLogs((prev) => (prev + "\n" + line).split("\n").slice(-6).join("\n"));
  }

  useEffect(() => {
    // 초기화
    setLogs("");
    setPercent(0);
    setStage("");
    setEta("-");
  }, []);

  const start = async (
    file: File,
    opts: ImageCompressOptions = {}
  ): Promise<File> => {
    const {
      maxBytes = 5 * MB, // 10MB
      maxWidth = 1920,
      maxHeight = 1080,
      format = "image/webp",
      maxIterations = 7,
      initialQuality = 0.82,
      minQuality = 0.4,
      maxQuality = 0.95,
    } = opts;

    t0Ref.current = 0;
    setPercent(2);
    setStage("이미지 준비중…");
    appendLog(`input: ${file.name} (${Math.round(file.size / 1024)} KB)`);

    // 1) 읽기
    setStage("이미지 읽는 중…");
    updateETA(0.02);
    await new Promise((r) => setTimeout(r, 20)); // UX용 미세 지연
    setPercent(Math.max(5, Math.round(weights.current.read * 100)));

    // 2) 메타 파싱
    setStage("메타 파싱/디코딩…");
    const meta = await getImageMeta(file);
    appendLog(`meta: ${meta.w}x${meta.h}, type=${meta.type}`);
    setPercent((p) =>
      Math.max(
        p,
        Math.round((weights.current.read + weights.current.decode) * 100)
      )
    );
    updateETA(percent / 100);

    // 3) 리사이즈 타겟 계산
    const { outW, outH } = fitWithin(meta.w, meta.h, maxWidth, maxHeight);
    const needResize = outW !== meta.w || outH !== meta.h;
    if (needResize) {
      appendLog(`resize → ${outW}x${outH}`);
    } else {
      appendLog(`resize skip (이미 한계 이하)`);
    }

    // 4) 디코딩+리사이즈
    setStage("리사이즈 중…");
    const canvas = await decodeAndResizeToCanvas(file, outW, outH);
    setPercent((p) =>
      Math.max(
        p,
        Math.round(
          (weights.current.read +
            weights.current.decode +
            weights.current.resize) *
            100
        )
      )
    );
    updateETA(percent / 100);

    // 5) 이진 탐색 인코딩 (목표 용량 충족)
    setStage("압축/인코딩 중…");
    let iterProgress = 0;
    const onIter = (iter: number, q: number, size: number) => {
      iterProgress = (iter + 1) / maxIterations; // 0~1
      const base =
        weights.current.read + weights.current.decode + weights.current.resize;
      const overall = base + weights.current.encode * iterProgress;
      setPercent(Math.min(99, Math.round(overall * 100)));
      appendLog(
        `encode iter#${iter + 1}: q=${q.toFixed(3)} → ${Math.round(
          size / 1024
        )} KB`
      );
      updateETA(Math.min(0.99, overall));
    };

    const { blob, quality } = await encodeToTargetBytes(
      canvas,
      format,
      maxBytes,
      {
        initialQuality,
        minQuality,
        maxQuality,
        maxIterations,
        onIter,
      }
    );

    appendLog(
      `final: q=${quality.toFixed(3)}, size=${Math.round(blob.size / 1024)} KB`
    );
    setPercent((p) =>
      Math.max(
        p,
        Math.round(
          (weights.current.read +
            weights.current.decode +
            weights.current.resize +
            weights.current.encode) *
            100
        )
      )
    );
    updateETA(percent / 100);

    // 6) 파일 생성 (쓰기)
    setStage("파일 생성 중…");
    const ext = format === "image/webp" ? "webp" : "jpg";
    const out = new File(
      [blob],
      file.name.replace(/\.[^.]+$/, "") + `-compressed.${ext}`,
      {
        type: format,
        lastModified: Date.now(),
      }
    );
    setPercent(100);
    setStage("이미지 최적화 완료!");
    setEta("0s");

    return out;
  };

  return { stage, logs, eta, percent, start };
}
