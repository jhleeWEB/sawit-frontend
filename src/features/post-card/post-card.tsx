"use client";

import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import { Post } from "@/service/fetch_post";
import PostCommentSection from "./_components/post-comment-section";
import PostCommentInput from "./_components/post-comment-input";

interface Props {
  post: Post;
  headerInfo?: "user" | "community";
  showComments?: boolean;
}
export default function PostCard(props: Props) {
  return (
    <>
      <PostTitleHeader {...props} />
      <PostContentBody post={props.post} />
      <PostCommentInput postId={props.post.id} />
      {props.showComments && <PostCommentSection postId={props.post.id} />}
    </>
  );
}
