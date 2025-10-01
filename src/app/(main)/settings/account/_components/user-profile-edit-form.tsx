"use client";

import AvatarEditModal from "@/components/modals/avatar-edit-modal";
import UsernameEditModal from "@/components/modals/username-edit-modal";
import { Button, useDisclosure } from "@heroui/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function UserProfileEditForm() {
  const {
    isOpen: isUsernameOpen,
    onOpen: onUsernameOpen,
    onOpenChange: onUsernameOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onOpenChange: onAvatarOpenChange,
  } = useDisclosure();

  return (
    <section className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <span className="flex flex-col">
          <label>별명</label>
          <small>별명을 모두에게 노출되는 이름입니다</small>
        </span>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          startContent={<MdOutlineKeyboardArrowRight size={28} />}
          onPress={() => onUsernameOpen()}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <span className="flex flex-col">
          <label>아바타</label>
          <small>나만의 아바타를 업로드해보세요</small>
        </span>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          startContent={<MdOutlineKeyboardArrowRight size={28} />}
          onPress={() => onAvatarOpen()}
        />
      </div>
      <UsernameEditModal
        isOpen={isUsernameOpen}
        onOpenChange={onUsernameOpenChange}
      />
      <AvatarEditModal
        isOpen={isAvatarOpen}
        onOpenChange={onAvatarOpenChange}
      />
    </section>
  );
}
