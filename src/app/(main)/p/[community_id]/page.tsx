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
    <div className="w-full max-w-5xl flex flex-col justify-center">
      <CommunityHeader iconUrl={icon_url} bannerUrl={banner_url} name={name} />
      <div className="flex">
        <div className="flex flex-col w-[70%] gap-4 px-4">
          <EmptyPost />
        </div>
        <div className="flex flex-col w-[30%] bg-teal-100 text-gray-400">
          <CommunityInfo created_at={created_at} description={description} />
        </div>
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
