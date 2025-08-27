import { Avatar } from "@heroui/react";
import { CommunityModel } from "../page";
import http from "@/lib/axios/http";
import PostForm from "./_components/post-form";

export default async function CreatePostPage({
  params,
}: {
  params: Promise<{ community_id: string }>;
}) {
  const { community_id } = await params;
  const id = decodeURIComponent(community_id);
  const { data } = await http.get<CommunityModel>(`/communities?id=${id}`);

  return (
    <div className="w-full max-w-5xl flex flex-col justify-center">
      <div className="flex">
        <div className="flex flex-col w-[70%] gap-4 px-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">무엇을 올려볼까요?</h1>
            <div className="flex items-center gap-2 ">
              <Avatar src={data.icon_url} />
              <p className="text-lg">p/{data.name}</p>
            </div>
          </div>
          <PostForm communityId={id} />
        </div>
        <div className="flex flex-col w-[30%] bg-teal-100 text-gray-400">d</div>
      </div>
    </div>
  );
}
