import PostCard from "@/features/post-card/post-card";
import fetchMyPosts from "@/service/fetch-my-posts";

export default async function MyPostsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const posts = await fetchMyPosts(username);

  return (
    <div>
      {posts ? (
        posts.map((post) => <PostCard key={"my_post_" + post.id} post={post} />)
      ) : (
        <div className="w-full text-center">게시한 게시물이 없습니다.</div>
      )}
    </div>
  );
}
