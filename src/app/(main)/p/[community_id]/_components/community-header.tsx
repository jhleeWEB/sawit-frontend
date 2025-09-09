"use client";

import { Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

interface Props {
  iconUrl: string;
  bannerUrl: string;
  name: string;
  id: string;
}

export default function CommunityHeader({
  iconUrl,
  bannerUrl,
  name,
  id,
}: Props) {
  const route = useRouter();
  return (
    <div className="col-start-1 col-span-2 w-full mb-[60px]">
      <div
        style={{
          backgroundImage: `url("${bannerUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={"relative min-h-[128px] rounded-xl w-full"}
      >
        <div className="absolute w-full px-8 bottom-[-50px] flex items-end">
          <div>
            <Avatar
              alt="icon"
              radius="full"
              src={iconUrl}
              className="w-[100px] h-[100px] border-white border-[4px]"
            />
          </div>
          <div className="w-full flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">p/{name}</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="light"
                radius="full"
                className="border"
                onPress={() => route.push(`/p/${id}/create`)}
              >
                게시물 만들기
              </Button>
              <Button variant="flat" color="primary" radius="full">
                여기 들어가볼까?
              </Button>
              <Button
                variant="light"
                isIconOnly
                radius="full"
                className="border"
              >
                <PiDotsThreeOutlineThin size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
