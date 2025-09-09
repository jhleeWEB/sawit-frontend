"use client";

import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import { Post } from "@/service/fetch_post";

interface Props {
  post: Post;
}
export default function UserPostDetail({ post }: Props) {
  return (
    <>
      <PostTitleHeader post={post} />
      <PostContentBody post={post} />
    </>
  );
}
