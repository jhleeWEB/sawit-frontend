"use client";

import { age, createdAt } from "@/lib/dayjs/date-utils";
import { Avatar } from "@heroui/react";
import Link from "next/link";

interface Props {
  icon: string;
  name: string;
  href: string;
  created_at: string;
  expires_at?: string;
}

export default function Header({
  icon,
  name,
  href,
  created_at,
  expires_at,
}: Props) {
  return (
    <Link href={href} className="flex items-center gap-2 ">
      <Avatar size="sm" src={icon} className="shrink-0" />
      <div className="flex flex-col gap-0 text-gray-500">
        <div className="flex items-center gap-1">
          <small className="font-bold text-gray-700">{name}</small>
          <span>·</span>
          <small>{createdAt(created_at)}</small>
          {expires_at && (
            <>
              <span>·</span>
              <small>{age(expires_at)}</small>
              <small>삭제</small>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
