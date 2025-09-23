"use server";
import CommunityHeader from "./_components/community-header";
import EmptyPost from "./_components/empty-post";
import fetchCommunityFeeds from "@/service/fetch-community-feeds";
import fetchCommunity from "@/service/fetch-community";
import CommunityInfo from "@/features/community-info";
import PostCard from "@/features/post-card/post-card";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ community_id: number }>;
}) {
  const { community_id } = await params;

  const community = await fetchCommunity(community_id);
  const feeds = await fetchCommunityFeeds(community_id);

  if (!community) {
    return;
  }

  return (
    <div className="main-container">
      <CommunityHeader community={community} />
      <main className="w-full">
        {feeds ? (
          <div>
            {feeds.map((post) => (
              <PostCard key={`${post.username}_${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPost />
        )}
      </main>
      <div className="right-menu-container" style={{ top: "128px" }}>
        <CommunityInfo community={community} />
      </div>
    </div>
  );
}
