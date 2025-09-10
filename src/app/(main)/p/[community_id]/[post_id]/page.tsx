import fetchPost from "@/service/fetch_post";
import fetchCommunity from "@/service/fetch-community";
import CommunityInfo from "@/features/community-info";
import PostCard from "@/features/post-card/post-card";

export default async function PostPage({
  params,
}: {
  params: Promise<{ community_id: string; post_id: string }>;
}) {
  const { post_id, community_id } = await params;
  const post = await fetchPost(post_id, community_id);
  const community = await fetchCommunity(community_id);
  if (!post) {
    return;
  }

  return (
    <div className="main-container">
      <main className="w-full py-8">
        <PostCard post={post} />
      </main>
      <div className="right-menu-container py-8">
        {community && <CommunityInfo showTitle community={community} />}
      </div>
    </div>
  );
}
