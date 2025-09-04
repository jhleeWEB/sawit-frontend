"use client";

import { Avatar } from "@heroui/react";

interface Props {
  avatar: string;
  username: string;
}

export default function UserHeader({ avatar, username }: Props) {
  return (
    <div className="flex col-start-1 col-span-2 w-full p-4">
      <Avatar
        alt="icon"
        radius="full"
        src={avatar}
        className="w-[60px] h-[60px] shrink-0 mr-2"
      />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{username}</h1>
        <p className="text-left text-gray-400">p/{username}</p>
      </div>
    </div>
  );
}
