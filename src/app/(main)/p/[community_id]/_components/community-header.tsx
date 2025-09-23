import { Avatar, Button } from "@heroui/react";
import CommunityOptionDropdown from "./community-dropdown";
import Link from "next/link";
import { Community } from "@/service/fetch-community";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/supabase/auth-options";

interface Props {
  community: Community;
}

export default async function CommunityHeader({ community }: Props) {
  const session = await getServerSession(authOptions);
  const isOwner = session?.user.id === community.owner_id;

  return (
    <div className="col-start-1 col-span-2 w-full mb-[60px]">
      <div
        style={{
          backgroundImage: `url("${community.banner_url}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={"relative min-h-[128px] rounded-xl w-full"}
      >
        <div className="absolute w-full px-8 pr-0 bottom-[-50px] flex items-end">
          <div>
            <Avatar
              alt="icon"
              radius="full"
              src={community.icon_url}
              className="w-[100px] h-[100px] border-white border-[4px]"
            />
          </div>
          <div className="w-full flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">p/{community.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="light"
                radius="full"
                className="border"
                as={Link}
                href={`/p/${community.id}/create`}
              >
                게시물 만들기
              </Button>

              {!isOwner && (
                <Button variant="flat" color="primary" radius="full">
                  여기 들어가볼까?
                </Button>
              )}
              {isOwner && <CommunityOptionDropdown id={community.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
