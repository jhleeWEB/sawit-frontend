// 간단 메타 수집: 길이(duration), 해상도(width/height)
export async function getVideoMeta(
  file: File
): Promise<{ duration: number; width?: number; height?: number }> {
  const url = URL.createObjectURL(file);
  try {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = url;
    await new Promise<void>((resolve, reject) => {
      v.onloadedmetadata = () => resolve();
      v.onerror = () => reject(new Error("failed to load metadata"));
    });
    return {
      duration: v.duration || 60,
      width: v.videoWidth || undefined,
      height: v.videoHeight || undefined,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}
