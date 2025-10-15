"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

export default function CommunityOptionDropdown({ id }: { id: number }) {
  return (
    <Dropdown className="min-w-[0px]" placement="bottom-end">
      <DropdownTrigger>
        <Button variant="light" isIconOnly radius="full" className="border">
          <PiDotsThreeOutlineThin size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" classNames={{ list: " text-center" }}>
        <DropdownItem key="setting" as={Link} href={`/c/${id}/settings`}>
          설정
        </DropdownItem>
        <DropdownItem key="delete" color="danger" className="text-danger">
          삭제
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
