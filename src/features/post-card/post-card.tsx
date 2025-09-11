"use client";

import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import { Post } from "@/service/fetch_post";
import PostComments from "./_components/post-comments";
import { Comment } from "@/service/fetch_comments";
import PostCommentInput from "./_components/post-comment-input";

interface Props {
  post: Post;
  headerInfo?: "user" | "community";
  comments?: Comment[];
}
export default function PostCard(props: Props) {
  return (
    <>
      <PostTitleHeader {...props} />
      <PostContentBody post={props.post} />
      <PostCommentInput postId={props.post.id} />
      {props.comments && <PostComments comments={props.comments} />}
    </>
  );
}
