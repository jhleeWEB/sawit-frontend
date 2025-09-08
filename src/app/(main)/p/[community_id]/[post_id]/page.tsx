import fetchPost from "@/service/fetch_post";
import fetchCommunity from "@/service/fetch-community";
import UserPostDetail from "@/features/user-post-detail/user-post-detail";
import CommunityInfo from "@/features/community-info";

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
        <UserPostDetail post={post} />
      </main>
      <div className="right-menu-container">
        {community && <CommunityInfo showTitle community={community} />}
      </div>
    </div>
  );
}
