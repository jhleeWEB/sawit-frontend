"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Divider,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "@/service/fetch-user";
import { IDENTITY } from "@/constants/identifiers";
import { createdAt } from "@/lib/dayjs/date-utils";
import Link from "next/link";

export default function MobileUserStats({ username }: { username: string }) {
  const { data: userData } = useSession();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser({ username }),
  });
  if (!user) return;
  const isOwner = userData?.user.id === user.id;
  return (
    <div className="mb-2">
      <Accordion variant="splitted" className="sm:hidden">
        <AccordionItem
          variant="splitted"
          classNames={{
            trigger: "p-2",
            base: "border-none",
          }}
          key="user-about"
          title="소개"
          subtitle={`게시물 ${user.post_count} · 댓글 ${user.comment_count} · 운영 ${user.community_count}`}
        >
          <div className="w-full rounded-2xl bg-slate-50 p-4">
            <h2 className="text=lg font-semibold">
              {IDENTITY.USER}
              {user.username}
            </h2>
            <section className="flex gap-2">
              <small>가입</small>
              <small>{createdAt(user.created_at)}</small>
            </section>
            <section className="flex justify-evenly text-center">
              <div>
                <h3 className="text-gray-700">{user.post_count}</h3>
                <small>게시물</small>
              </div>
              <div>
                <h3 className="text-gray-700">{user.comment_count}</h3>
                <small>댓글</small>
              </div>
              <div>
                <h3 className="text-gray-700">{user.community_count}</h3>
                <small>커뮤니티 운영</small>
              </div>
            </section>
            {isOwner && (
              <>
                <Divider className="my-2" />
                <small>설정</small>
                <section>
                  <div className="flex justify-between">
                    <span className="flex gap-2">
                      <Avatar size="sm" src={user.image} />
                      <span className="flex flex-col">
                        <small className="font-semibold">프로필</small>
                        <small>프로필을 설정해 보세요.</small>
                      </span>
                    </span>
                    <Button
                      radius="full"
                      size="sm"
                      as={Link}
                      href={`/settings/account`}
                    >
                      업데이트
                    </Button>
                  </div>
                </section>
              </>
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
