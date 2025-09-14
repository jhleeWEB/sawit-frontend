import CommunityHeader from "./_components/community-header";
import EmptyPost from "./_components/empty-post";
import fetchCommunityFeeds from "@/service/fetch-community-feeds";
import fetchCommunity from "@/service/fetch-community";
import CommunityInfo from "@/features/community-info";
import PostCard from "@/features/post-card/post-card";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ community_id: string }>;
}) {
  const { community_id } = await params;
  const id = decodeURIComponent(community_id);
  const community = await fetchCommunity(id);
  const feeds = await fetchCommunityFeeds(id);
  if (!community) {
    return;
  }

  const { name, banner_url, icon_url } = community;
  return (
    <div className="main-container">
      <CommunityHeader
        iconUrl={icon_url}
        bannerUrl={banner_url}
        name={name}
        id={id}
      />
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

export interface CommunityModel {
  id: number;
  banner_url: string;
  icon_url: string;
  name: string;
  description: string;
  topics: string;
  created_at: Date;
}
