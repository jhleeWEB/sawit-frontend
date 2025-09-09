"use client";
import { Avatar } from "@heroui/react";
import createdAt from "@/lib/dayjs/created-at";

import { Post } from "@/service/fetch_post";

interface Props {
  post: Post;
}

export default function PostTitleHeader({ post }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 ">
        <Avatar size="sm" src={post.owner_icon} className="shrink-0" />
        <div className="flex flex-col gap-0 text-gray-500">
          <div className="flex items-center gap-1">
            <small className="font-bold text-gray-700">
              u/{post.owner_username}
            </small>
            <span>·</span>
            <small>{createdAt(post.created_at)}</small>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
    </div>
  );
}
