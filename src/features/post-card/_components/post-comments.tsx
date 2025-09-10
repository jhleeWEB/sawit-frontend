"use client";

import { Post } from "@/service/fetch_post";

interface Props {
  post: Post;
}

export default function PostComments({ post }: Props) {
  return <div>{post.id}</div>;
}
