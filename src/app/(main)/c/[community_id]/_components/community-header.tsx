"use client";

import { Avatar, Button, Image, useDisclosure } from "@heroui/react";
import CommunityOptionDropdown from "./community-dropdown";
import Link from "next/link";
import { Community } from "@/service/fetch-community";

import JoinCommunityModal from "@/components/modals/join-community-modal";
import fetchIsCommunityMember from "@/service/fetch-is-community-member";
import { useQueries } from "@tanstack/react-query";
import fetchIsOwner from "@/service/fetch-is-owner";
import CommunityHeaderSkeleton from "@/components/skeletons/community_header_skeleton";

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

  if (isOwnerLoading || isMemberLoading) return <CommunityHeaderSkeleton />;
  return (
    <div className="w-dvw sm:col-span-2 sm:col-start-1 sm:w-full">
      <Image
        alt="community-banner-image"
        className="rounded-none sm:rounded-2xl"
        src={community.banner_url}
      />
      <div className="z-10 flex w-full items-end px-4 sm:relative sm:top-[-3.25rem] sm:px-8 sm:pr-0">
        <Avatar
          alt="icon"
          radius="full"
          src={community.icon_url}
          className="h-[3.25rem] w-[3.25rem] shrink-0 border-[4px] border-white sm:h-[6.25rem] sm:w-[6.25rem]"
        />
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-lg font-bold sm:text-3xl">
              p/{community.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="light"
              radius="full"
              className="hidden border sm:visible"
              as={Link}
              href={`/c/${community.id}/create`}
            >
              게시물 올리기
            </Button>
            {!isOwner && (
              <>
                {!isMember ? (
                  <Button
                    variant="flat"
                    color="primary"
                    radius="full"
                    onPress={() => {
                      onOpen();
                    }}
                  >
                    들어가기
                  </Button>
                ) : (
                  <Button
                    variant="flat"
                    color="danger"
                    radius="full"
                    onPress={() => {
                      onOpen();
                    }}
                  >
                    나가기
                  </Button>
                )}
              </>
            )}
            {isOwner && <CommunityOptionDropdown id={community.id} />}
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
