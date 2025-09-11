"use client";

import createdAt from "@/lib/dayjs/created-at";
import { Avatar } from "@heroui/react";

interface Props {
  icon: string;
  name: string;
  created_at: string;
}

export default function Header({ icon, name, created_at }: Props) {
  return (
    <div className="flex items-center gap-2 ">
      <Avatar size="sm" src={icon} className="shrink-0" />
      <div className="flex flex-col gap-0 text-gray-500">
        <div className="flex items-center gap-1">
          <small className="font-bold text-gray-700">{name}</small>
          <span>·</span>
          <small>{createdAt(created_at)}</small>
        </div>
      </div>
    </div>
  );
}
