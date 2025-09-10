"use client";

import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import { Post } from "@/service/fetch_post";

interface Props {
  post: Post;
  headerInfo?: "user" | "community";
}
export default function PostCard(props: Props) {
  return (
    <>
      <PostTitleHeader {...props} />
      <PostContentBody post={props.post} />
    </>
  );
}
