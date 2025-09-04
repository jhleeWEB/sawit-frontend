import CommunityHeader from "./_components/community-header";
import CommunityInfo from "./_components/community-info";
import EmptyPost from "./_components/empty-post";
import fetchCommunity from "./_apis/fetch-community";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ community_id: string }>;
}) {
  const { community_id } = await params;
  const id = decodeURIComponent(community_id);
  const community = await fetchCommunity(id);
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
        <EmptyPost />
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
