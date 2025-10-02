"use client";
import { createdAt } from "@/lib/dayjs/date-utils";
import { Avatar } from "@heroui/react";
import Link from "next/link";

interface Props {
  headerOptions: {
    icon: string;
    name: string;
    href: string;
    is_owner?: boolean;
    created_at: string;
  };
}

export default function CommentHeader({ headerOptions }: Props) {
  const { icon, name, href, created_at } = headerOptions;

  return (
    <section className="flex w-full gap-2">
      <Link href={href} className="flex items-center">
        <Avatar size="sm" src={icon} className="shrink-0 mr-2" />
        <div className="flex flex-col gap-0 text-gray-500">
          <div className="flex items-center gap-1">
            <small className="font-bold text-gray-700">{name}</small>
            <span>·</span>
            <small>{createdAt(created_at)}</small>
          </div>
        </div>
      </Link>
    </section>
  );
}
