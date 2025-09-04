"use client";

import { Post } from "../../create/_apis/create-new-post";

interface Props {
  post: Post;
}

export default function PostComments({ post }: Props) {
  return <div>comment</div>;
}
