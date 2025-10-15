export async function getMeta(
  file: File
): Promise<{ duration: number; w: number; h: number }> {
  const url = URL.createObjectURL(file);
  try {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = url;
    await new Promise<void>((res, rej) => {
      v.onloadedmetadata = () => res();
      v.onerror = () => rej(new Error("metadata load failed"));
    });
    return {
      duration: v.duration || 1,
      w: v.videoWidth || 0,
      h: v.videoHeight || 0,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}
