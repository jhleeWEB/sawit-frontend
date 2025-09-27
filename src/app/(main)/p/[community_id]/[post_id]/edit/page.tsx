import fetchPostMedia from "@/service/fetch-post-media";

import EditPostForm from "./_components/edit-post-form";
import fetchPost from "@/service/fetch_post";
import { redirect } from "next/navigation";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ community_id: number; post_id: number }>;
}) {
  const { post_id } = await params;
  const postMedia = await fetchPostMedia({ post_id });
  const post = await fetchPost(post_id);
  if (!post) {
    redirect("/");
  }
  if (!postMedia) return;

  return (
    <div className="main-container">
      <main className="w-full px-16">
        <EditPostForm post={post} postMedia={postMedia} />
      </main>
      <div className="right-menu-container"></div>
    </div>
  );
}
