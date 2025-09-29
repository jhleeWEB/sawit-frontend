import fetchUser from "../../../../service/fetch-user";
import UserHeader from "./_components/user-header";
import UserStats from "./_components/user-stats";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await fetchUser({ username });
  if (!user) return { title: "사용자 없음" };

  return {
    title: `${user.username} 프로필 - Sawit`,
    description: `${user.username}님의 활동 내역과 통계를 확인하세요.`,
    openGraph: {
      title: `${user.username} 프로필`,
      images: [user.image],
    },
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userInfo = await fetchUser({ username });

  if (!userInfo) {
    return;
  }
  return (
    <div className="main-container">
      <UserHeader avatar={userInfo.image} username={userInfo.username} />
      <main className="w-full"></main>
      <div className="right-menu-container">
        <UserStats user={userInfo} />
      </div>
    </div>
  );
}
