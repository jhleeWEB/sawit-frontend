export function renameWithExt(name: string, mime: string) {
  const base = name.replace(/\.[a-z0-9]+$/i, "");
  const ext =
    mime === "image/webp" ? "webp" : mime === "image/png" ? "png" : "jpg";
  return `${base}.${ext}`;
}
