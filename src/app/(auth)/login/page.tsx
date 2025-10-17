"use client";

import { Button } from "@heroui/react";
import { SiKakao, SiNaver } from "react-icons/si";
import {
  AiOutlineInstagram,
  AiOutlineGoogle,
  AiOutlineGithub,
} from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";

const authTypes = ["naver", "kakao", "instagram", "google", "github"];

export default function LoginPage() {
  return (
    <div className="main-container">
      <main className="w-full">
        {authTypes.map((type) => (
          <Button
            key={type}
            variant="bordered"
            fullWidth
            className="border-teal relative mb-2 flex items-center justify-center rounded-md border-1 font-bold text-gray-400"
            onPress={() => signIn(type, { callbackUrl: "/" })}
          >
            {type === "naver" && (
              <SiNaver className="absolute left-4" size={12} />
            )}
            {type === "kakao" && (
              <SiKakao className="absolute left-4" size={32} />
            )}
            {type === "instagram" && (
              <AiOutlineInstagram className="absolute left-4" size={18} />
            )}
            {type === "google" && (
              <AiOutlineGoogle className="absolute left-4" size={18} />
            )}
            {type === "github" && (
              <AiOutlineGithub className="absolute left-4" size={18} />
            )}
            {type}로 계속하기
          </Button>
        ))}
        <Link
          href={"/"}
          className="mt-5 w-full cursor-pointer text-center text-gray-300 hover:text-danger-300"
        >
          <small>뒤로가기</small>
        </Link>
      </main>
    </div>
  );
}
