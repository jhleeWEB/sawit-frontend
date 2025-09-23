import fetchCommunity from "@/service/fetch-community";
import CommunitySettings from "./_components/community-settings";

export default async function Page({
  params,
}: {
  params: Promise<{ community_id: number }>;
}) {
  const { community_id } = await params;
  if (!community_id) {
    return;
  }
  const community_info = await fetchCommunity(community_id);
  if (!community_info) {
    return;
  }

  return (
    <div className="main-container">
      <CommunitySettings community_info={community_info} />
    </div>
  );
}
