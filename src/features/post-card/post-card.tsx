"use client";

import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import { Post } from "@/service/fetch_post";
import PostCommentSection from "./_components/post-comment-section";
import PostCommentInput from "./_components/post-comment-input";
import { Divider } from "@heroui/react";

interface Props {
  post: Post;
  headerInfo?: "user" | "community";
  showComments?: boolean;
}
export default function PostCard(props: Props) {
  const { post, showComments = false } = props;

  return (
    <article className="post_container ">
      <PostTitleHeader {...props} />
      <PostContentBody post={post} />
      <Divider className="my-4" />
      {showComments && (
        <>
          <PostCommentInput postId={post.id} />
          <PostCommentSection postId={post.id} />
        </>
      )}
    </article>
  );
}
