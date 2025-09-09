import { Post } from "@/service/fetch_post";
import PostTitleHeader from "./user-post-detail/_components/post-title-header";
import PostContentBody from "./user-post-detail/_components/post-content-body";

interface Props {
  post: Post;
}

export default function UserPost({ post }: Props) {
  return (
    <>
      <PostTitleHeader post={post} />
      <PostContentBody post={post} />
    </>
  );
}
