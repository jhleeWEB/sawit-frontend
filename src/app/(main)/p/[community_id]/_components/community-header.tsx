"use client";

import { Avatar, Button, useDisclosure } from "@heroui/react";
import CommunityOptionDropdown from "./community-dropdown";
import Link from "next/link";
import { Community } from "@/service/fetch-community";

import JoinCommunityModal from "@/components/modals/join-community-modal";
import fetchIsCommunityMember from "@/service/fetch-is-community-member";
import { useQueries } from "@tanstack/react-query";
import fetchIsOwner from "@/service/fetch-is-owner";

interface Props {
  community: Community;
}

export default function CommunityHeader({ community }: Props) {
  const [
    { data: isMember, isLoading: isMemberLoading },
    { data: isOwner, isLoading: isOwnerLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["is-member", 1],
        queryFn: () => fetchIsCommunityMember(community.id),
      },
      {
        queryKey: ["is-owner", 2],
        queryFn: () => fetchIsOwner("community", community.id),
      },
    ],
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="col-start-1 col-span-2 w-full mb-[60px]">
      <div
        style={{
          backgroundImage: `url("${community.banner_url}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={"relative min-h-[128px] rounded-xl w-full"}
      >
        <div className="absolute w-full px-8 pr-0 bottom-[-50px] flex items-end">
          <div>
            <Avatar
              alt="icon"
              radius="full"
              src={community.icon_url}
              className="w-[100px] h-[100px] border-white border-[4px]"
            />
          </div>
          <div className="w-full flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">p/{community.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="light"
                radius="full"
                className="border"
                as={Link}
                href={`/p/${community.id}/create`}
              >
                게시물 만들기
              </Button>
              {!isOwner && !isMember && !isOwnerLoading && !isMemberLoading && (
                <Button
                  variant="flat"
                  color="primary"
                  radius="full"
                  onPress={() => {
                    onOpen();
                  }}
                >
                  가입하기
                </Button>
              )}
              {isOwner && !isOwnerLoading && (
                <CommunityOptionDropdown id={community.id} />
              )}
            </div>
          </div>
        </div>
      </div>
      <JoinCommunityModal
        community={community}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
