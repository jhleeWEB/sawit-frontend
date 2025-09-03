import http from "@/lib/axios/http";
import CommunityHeader from "./_components/community-header";
import CommunityInfo from "./_components/community-info";
import EmptyPost from "./_components/empty-post";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ community_id: string }>;
}) {
  const { community_id } = await params;
  const id = decodeURIComponent(community_id);
  const { data } = await http.get<CommunityModel>(`/communities?id=${id}`);
  const { name, description, banner_url, icon_url, created_at } = data;
  return (
    <div className="main-container">
      <main className="w-full">
        <CommunityHeader
          iconUrl={icon_url}
          bannerUrl={banner_url}
          name={name}
        />

        <div className="flex flex-col w-[70%] gap-4 px-4">
          <EmptyPost />
        </div>
      </main>
      <div className="right-menu-container">
        <CommunityInfo created_at={created_at} description={description} />
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
