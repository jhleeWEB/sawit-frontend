export default async function getUserSession() {
  // 서버 사이드
  if (typeof window === "undefined") {
    const [{ getServerSession }, { authOptions }] = await Promise.all([
      import("next-auth"),
      import("./auth-options"),
    ]);
    return getServerSession(authOptions);
  }

  // 클라이언트 사이드
  const { getSession } = await import("next-auth/react");
  return getSession();
}
