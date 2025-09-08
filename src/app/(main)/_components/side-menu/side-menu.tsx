"use client";
import { Button, Link } from "@heroui/react";
import { PiHouseSimpleThin } from "react-icons/pi";
import { PiHandsClappingLight } from "react-icons/pi";

export default function SideMenu() {
  return (
    <div className="flex flex-col w-full justify-center py-8 px-4">
      <div className="">
        <Link
          href="/"
          as={Button}
          fullWidth
          variant="light"
          className="flex justify-start text-default-900 gap-4"
          startContent={<PiHouseSimpleThin size={22} />}
        >
          <h3>홈으로</h3>
        </Link>
        <Link
          as={Button}
          fullWidth
          variant="light"
          className="flex justify-start text-default-900 gap-4"
          startContent={<PiHandsClappingLight size={22} />}
        >
          <h3>인기 글</h3>
        </Link>
      </div>
    </div>
  );
}
