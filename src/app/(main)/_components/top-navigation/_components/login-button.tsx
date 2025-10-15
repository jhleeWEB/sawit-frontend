"use client";

import SocialLoginModal from "@/components/modals/social-login-modal";
import { Button, useDisclosure } from "@heroui/react";

export default function LoginButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button variant="light" radius="full" onPress={() => onOpen()}>
        <small className="cursor-pointer hover:text-primary-400">로그인</small>
      </Button>
      <SocialLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
