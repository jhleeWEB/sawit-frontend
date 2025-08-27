"use client";

import { Button } from "@heroui/react";
import MediaCarousel from "./media-carousel";
import {
  PiArrowFatLineDownThin,
  PiArrowFatLineUpThin,
  PiChatCircleDotsThin,
  PiShareFatThin,
} from "react-icons/pi";

interface Props {
  text: string;
  urls: string[];
}

export default function PostContentBody({ text, urls }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <MediaCarousel urls={urls} />
      <div>
        <p>{text}</p>
      </div>
      {/* 하단 버튼 그룹 */}
      <div className="flex gap-2">
        {/* 올려/내려 버튼 그룹 */}
        <div className="flex items-center bg-default-300 rounded-full">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="hover:bg-default-200"
          >
            <PiArrowFatLineUpThin size={20} className="hover:text-red-500" />
          </Button>
          <small>32</small>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="hover:bg-default-200"
          >
            <PiArrowFatLineDownThin size={20} className="hover:text-blue-500" />
          </Button>
        </div>
        {/* 댓글 버튼 */}
        <Button radius="full" size="sm" className="hover:bg-default-200">
          <PiChatCircleDotsThin size={20} />
          <small className="text-[13px]">6</small>
        </Button>
        {/* 공유하기 버튼 */}
        <Button radius="full" size="sm" className="hover:bg-default-200">
          <PiShareFatThin size={20} />
          <small className="text-[13px]">공유</small>
        </Button>
      </div>
    </div>
  );
}
