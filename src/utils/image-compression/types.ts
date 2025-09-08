export const MB = 1024 * 1024;

export type CompressOptions = {
  maxBytes: number; // 예: 10 * MB
  maxWidth?: number; // 리사이즈 상한 (선택)
  maxHeight?: number; // 리사이즈 상한 (선택)
  mimeCandidates?: string[]; // 시도할 포맷 우선순위
  qualityStart?: number; // 시작 품질
};
