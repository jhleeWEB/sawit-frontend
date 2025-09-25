import sanitizeHtml from "sanitize-html";

export function normalize(html: string) {
  return sanitizeHtml(html, {
    /* 허용 목록 */
  })
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
}
