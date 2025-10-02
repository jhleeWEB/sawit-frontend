import { IDENTITY } from "@/constants/identifiers";
import fetchUser from "@/service/fetch-user";
import { Avatar } from "@heroui/react";

export default async function UserHeader({ username }: { username: string }) {
  const userInfo = await fetchUser({ username });
  if (!userInfo) return;
  return (
    <div className="flex col-start-1 col-span-2 w-full p-4">
      <Avatar
        alt="icon"
        radius="full"
        src={userInfo.image}
        className="w-[60px] h-[60px] shrink-0 mr-2"
      />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{username}</h1>
        <p className="text-left text-gray-400">
          {IDENTITY.USER}
          {username}
        </p>
      </div>
    </div>
  );
}
