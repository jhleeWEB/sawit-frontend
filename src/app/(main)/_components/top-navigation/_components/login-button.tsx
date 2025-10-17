"use client";

import SocialLoginModal from "@/components/modals/social-login-modal";
import { Button, useDisclosure } from "@heroui/react";

export default function LoginButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button variant="light" radius="full" size="sm" onPress={() => onOpen()}>
        로그인
      </Button>
      <SocialLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
