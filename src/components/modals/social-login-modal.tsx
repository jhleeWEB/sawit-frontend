"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineInstagram,
} from "react-icons/ai";
import { SiKakao, SiNaver } from "react-icons/si";

const oAuthProviders = ["naver", "kakao", "instagram", "google", "github"];

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  redirectUrl?: string;
}
export default function SocialLoginModal(props: Props) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal {...props}>
      <ModalContent>
        <ModalHeader>로그인</ModalHeader>
        <ModalBody>
          {oAuthProviders.map((provider) => (
            <Button
              key={provider}
              isLoading={isLoading}
              disabled={isLoading}
              variant="bordered"
              fullWidth
              className="relative flex items-center border-1 border-teal justify-center rounded-md text-gray-400 font-bold"
              onPress={() => {
                setIsLoading(true);
                signIn(provider, {
                  callbackUrl: props.redirectUrl || pathname || "/",
                });
              }}
            >
              {provider === "naver" && (
                <SiNaver className="absolute left-4" size={12} />
              )}
              {provider === "kakao" && (
                <SiKakao className="absolute left-4" size={32} />
              )}
              {provider === "instagram" && (
                <AiOutlineInstagram className="absolute left-4" size={18} />
              )}
              {provider === "google" && (
                <AiOutlineGoogle className="absolute left-4" size={18} />
              )}
              {provider === "github" && (
                <AiOutlineGithub className="absolute left-4" size={18} />
              )}
              {provider}로 계속하기
            </Button>
          ))}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
