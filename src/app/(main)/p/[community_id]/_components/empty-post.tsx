"use client";

import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { PiPlusCircleLight, PiSmileySadThin } from "react-icons/pi";

export default function EmptyPost() {
  const route = useRouter();
  const pathname = usePathname();
  const onClickCreatePost = () => {
    route.push(pathname + "/create");
  };
  return (
    <div className="border rounded-xl flex flex-col items-center justify-center p-16">
      <p>커뮤니티에 게시물이 하나도 없습니다...</p>
      <PiSmileySadThin size={36} className="mb-8" />
      <Button
        onClick={onClickCreatePost}
        variant="light"
        radius="lg"
        isIconOnly
        className="border"
      >
        <PiPlusCircleLight size={36} />
      </Button>
    </div>
  );
}
