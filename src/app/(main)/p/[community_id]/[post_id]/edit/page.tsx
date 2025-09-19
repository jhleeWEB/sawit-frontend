import fetchPostMedia from "@/service/fetch-post-media";

import EditPostForm from "./_components/edit-post-form";
import fetchPost from "@/service/fetch_post";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ community_id: number; post_id: number }>;
}) {
  const { community_id, post_id } = await params;
  const postMedia = await fetchPostMedia({ post_id });
  const post = await fetchPost(post_id, community_id);
  if (!post) return;
  if (!postMedia) return;

  return (
    <div className="main-container">
      <div className="w-full px-16">
        <EditPostForm post={post} postMedia={postMedia} />
      </div>
      <div className="right-menu-container">d</div>
    </div>
  );
}
