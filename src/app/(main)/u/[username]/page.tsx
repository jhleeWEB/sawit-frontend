import fetchUser from "../../../../service/fetch-user";
import UserHeader from "./_components/user-header";
import UserStats from "./_components/user-stats";

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
