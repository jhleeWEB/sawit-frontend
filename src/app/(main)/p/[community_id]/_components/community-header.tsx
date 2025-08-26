"use client";

import { Avatar, Button } from "@heroui/react";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

interface Props {
  iconUrl: string;
  bannerUrl: string;
  name: string;
}

export default function CommunityHeader({ iconUrl, bannerUrl, name }: Props) {
  return (
    <div className="w-full mb-[80px]">
      <div
        /**@ts-expect-error custom style property*/
        style={{ "--image-url": `url(${bannerUrl})` }}
        className={
          "relative min-h-[128px] rounded-xl w-full bg-[image:var(--image-url)] bg-cover"
        }
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
              <Button variant="light" radius="full" className="border">
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
