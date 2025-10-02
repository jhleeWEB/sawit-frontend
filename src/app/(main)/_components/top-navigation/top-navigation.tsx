import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { IoAddOutline } from "react-icons/io5";
import AvatarDropdown from "./_components/avatar-dropdown";

import fetchUser from "@/service/fetch-user";
import { authOptions } from "@/lib/auth/supabase/auth-options";

export default async function TopNavigation() {
  const session = await getServerSession(authOptions);
  const userInfo = await fetchUser({ id: session?.user.id });

  return (
    <Navbar isBlurred maxWidth="full" isBordered>
      <NavbarBrand>
        <Link href="/">
          <Image
            radius="none"
            alt="sawit-logo"
            src="/sawit-logo.png"
            height={56}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {userInfo ? (
          <>
            <NavbarItem>
              <Link
                href={`/create-post`}
                className="flex items-center p-2 pl-0 text-[24px] rounded-md cursor-pointer hover:text-teal-400"
              >
                <IoAddOutline />
                <small className="text-[12px]">나도 올려볼까?</small>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <AvatarDropdown image={userInfo.image} name={userInfo.username} />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link
                href={"/login"}
                className="flex items-center p-2 pl-0 text-[24px] rounded-md cursor-pointer hover:text-teal-400"
              >
                <IoAddOutline />
                <small className="text-[12px]">나도 올려볼까?</small>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/login">
                <small className="cursor-pointer hover:text-primary-400">
                  로그인
                </small>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
