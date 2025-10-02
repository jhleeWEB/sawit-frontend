"use client";

import { IDENTITY } from "@/constants/identifiers";
import { createdAt } from "@/lib/dayjs/date-utils";
import { Post } from "@/service/fetch_post";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

interface Props {
  post: Post;
  headerInfo: "user" | "community";
}

export default function Header({ post, headerInfo }: Props) {
  const { data: sessionData } = useSession();
  const isOwner = sessionData?.user.id === post.owner_id;
  const icon = headerInfo === "user" ? post.owner_icon : post.community_icon;
  const name =
    headerInfo === "user"
      ? IDENTITY.USER + post.owner_username
      : IDENTITY.COMMUNITY + post.community_name;
  const href =
    headerInfo === "user"
      ? `/u/${post.owner_username}`
      : `/c/${post.community_id}`;

  return (
    <section className="flex w-full gap-2">
      <Link href={href} className="flex items-center">
        <Avatar size="sm" src={icon} className="shrink-0 mr-2" />
        <div className="flex flex-col gap-0 text-gray-500">
          <div className="flex items-center gap-1">
            <small className="font-bold text-gray-700">{name}</small>
            <span>·</span>
            <small>{createdAt(post.created_at)}</small>
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
            <DropdownItem
              as={Link}
              href={`/p/${post.community_id}/${post.id}/edit`}
              key="setting"
            >
              수정
            </DropdownItem>
            <DropdownItem key="delete" color="danger" className="text-danger">
              삭제
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </section>
  );
}
