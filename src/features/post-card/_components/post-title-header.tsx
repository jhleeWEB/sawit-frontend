"use client";
import { Post } from "@/service/fetch_post";

import PostHeader from "./post-header";
import Link from "next/link";

interface Props {
  post: Post;
  headerInfo?: "user" | "community";
}

export default function PostTitleHeader({ post, headerInfo = "user" }: Props) {
  return (
    <div>
      <PostHeader headerInfo={headerInfo} post={post} />
      <Link
        href={`/c/${post.community_id}/${post.id}`}
        className="text-2xl font-bold"
      >
        {post.title}
      </Link>
    </div>
  );
}
