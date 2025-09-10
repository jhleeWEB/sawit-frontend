export function sanitizeObjectKey(input: string) {
  return input
    .normalize("NFC")
    .replace(/%/g, "-") // % 금지
    .replace(/[\u0000-\u001F]/g, "") // 제어문자 제거
    .replace(/[^\w/!\-.*'() &$@=;:+,?]/g, "_") // 허용 이외 -> _
    .replace(/\/{2,}/g, "/") // // -> /
    .replace(/^\/+|\/+$/g, ""); // 선행/후행 슬래시 제거
}
