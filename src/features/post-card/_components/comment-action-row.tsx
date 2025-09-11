"use client";

import { Button } from "@heroui/react";
import {
  PiArrowFatDownThin,
  PiArrowFatUpThin,
  PiChatCircleDotsThin,
} from "react-icons/pi";

export default function CommentActionRow() {
  return (
    <div className="flex text-">
      <div className="flex items-center">
        <Button
          variant="light"
          radius="full"
          isIconOnly
          size="sm"
          startContent={
            <PiArrowFatUpThin size={18} className="hover:text-red-500" />
          }
        />
        <small className="mx-1">0</small>
        <Button
          variant="light"
          radius="full"
          size="sm"
          isIconOnly
          startContent={
            <PiArrowFatDownThin size={18} className="hover:text-blue-500" />
          }
        />
      </div>
      <div>
        <Button
          variant="light"
          radius="full"
          size="sm"
          startContent={
            <PiChatCircleDotsThin size={18} className="hover:text-blue-500" />
          }
        >
          답변
        </Button>
      </div>
    </div>
  );
}
