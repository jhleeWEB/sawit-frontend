import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import fetchPost from "./_apis/fetch_post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ community_id: string; post_id: string }>;
}) {
  const { post_id, community_id } = await params;
  const post = await fetchPost(post_id, community_id);
  if (!post) {
    return;
  }

  return (
    <div className="main-container">
      <main className="w-full">
        <PostTitleHeader post={post} />
        <PostContentBody post={post} />
      </main>
      <div className="right-menu-container">d</div>
    </div>
  );
}
