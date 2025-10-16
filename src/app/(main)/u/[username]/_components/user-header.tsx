import { IDENTITY } from "@/constants/identifiers";
import fetchUser from "@/service/fetch-user";
import { Avatar } from "@heroui/react";

export default async function UserHeader({ username }: { username: string }) {
  const userInfo = await fetchUser({ username });
  if (!userInfo) return;
  return (
    <div className="col-span-2 col-start-1 flex w-full py-4">
      <Avatar
        alt="icon"
        radius="full"
        src={userInfo.image}
        className="mr-2 h-[60px] w-[60px] shrink-0"
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
