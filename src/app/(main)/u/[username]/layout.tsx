import { Metadata } from "next";
import UserHeader from "./_components/user-header";
import MyActivityTabs from "./_components/my-activity-tabs";
import { memo } from "react";
import UserStats from "./_components/user-stats";
import fetchUser from "@/service/fetch-user";

export const metadata: Metadata = {
  title: "Sawit",
  description: "Have You seen it? Yes I Sawit!",
};

export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}>) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const user = await fetchUser({});

  let isOwner = false;
  if (user && user.username === decodedUsername) {
    isOwner = true;
  }
  return (
    <div className="main-container">
      <main className="w-full px-2 sm:px-0">
        <UserHeader username={decodedUsername} />
        <MemoMyActivityTabs isOwner={isOwner} />
        {children}
      </main>
      <div className="right-menu-container">
        <aside className="w-full">
          <UserStats username={decodedUsername} />
        </aside>
      </div>
    </div>
  );
}

const MemoMyActivityTabs = memo(MyActivityTabs);
