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
    <div className="w-full flex flex-col justify-center">
      <div className="flex max-w-4xl h-full mx-auto">
        <div className="flex flex-col w-[70%] max-w-screen-sm gap-4 px-4 overflow-auto">
          <div>
            <h1 className="text-2xl font-bold mb-4">무엇을 올려볼까요?</h1>
            <div className="flex items-center gap-2 ">
              <Avatar src={data.icon_url} />
              <p className="text-lg">p/{data.name}</p>
            </div>
          </div>
          <PostForm />
        </div>
        <div className="flex flex-col w-[30%] max-h-dvh text-gray-400">d</div>
      </div>
    </div>
  );
}
