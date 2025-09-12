"use client";

import { age, createdAt } from "@/lib/dayjs/date-utils";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

interface Props {
  icon: string;
  name: string;
  href: string;
  isOwner: boolean;
  created_at: string;
  expires_at?: string;
}

export default function Header({
  icon,
  name,
  href,
  isOwner,
  created_at,
  expires_at,
}: Props) {
  return (
    <section className="flex w-full gap-2">
      <Link href={href} className="flex items-center">
        <Avatar size="sm" src={icon} className="shrink-0 mr-2" />
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
      {isOwner && (
        <Dropdown placement="bottom-end" className="min-w-[60px]">
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              radius="full"
              size="sm"
              fullWidth
              startContent={<BsThreeDots size={18} />}
              className="ml-auto float-right text-neutral-500"
            />
          </DropdownTrigger>
          <DropdownMenu variant="flat" classNames={{ list: " text-center" }}>
            <DropdownItem key="setting">수정</DropdownItem>
            <DropdownItem key="delete" color="danger" className="text-danger">
              삭제
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </section>
  );
}
