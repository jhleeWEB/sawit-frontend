"use client";

import { Avatar, Button, Image, Skeleton, useDisclosure } from "@heroui/react";
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
    <div className="w-dvw sm:col-span-2 sm:col-start-1 sm:w-full">
      <Skeleton
        isLoaded={!isOwnerLoading || !isMemberLoading}
        className="rounded-none sm:rounded-2xl"
      >
        <Image
          alt="community-banner-image"
          className="rounded-none sm:w-full sm:rounded-2xl"
          src={community.banner_url}
        />
      </Skeleton>
      <div className="z-10 flex w-full items-end px-4 sm:relative sm:top-[-3.25rem] sm:px-8 sm:pr-0">
        <Skeleton
          isLoaded={!isOwnerLoading || !isMemberLoading}
          className="shrink-0 rounded-full border-white"
        >
          <Avatar
            alt="icon"
            radius="full"
            src={community.icon_url}
            className="h-[3.25rem] w-[3.25rem] shrink-0 border-[4px] border-white sm:h-[6.25rem] sm:w-[6.25rem]"
          />
        </Skeleton>
        <div className="flex w-full items-center justify-between">
          <div>
            <Skeleton
              className="rounded-xl"
              isLoaded={!isOwnerLoading || !isMemberLoading}
            >
              <h1 className="text-lg font-bold sm:text-3xl">
                p/{community.name}
              </h1>
            </Skeleton>
          </div>
          <div className="flex gap-2">
            <Skeleton
              className="rounded-xl"
              isLoaded={!isOwnerLoading || !isMemberLoading}
            >
              <Button
                variant="light"
                radius="full"
                className="hidden border sm:visible"
                as={Link}
                href={`/c/${community.id}/create`}
              >
                게시물 올리기
              </Button>
            </Skeleton>
            {!isOwner && (
              <>
                {!isMember ? (
                  <Skeleton
                    className="rounded-xl"
                    isLoaded={!isOwnerLoading || !isMemberLoading}
                  >
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
                  </Skeleton>
                ) : (
                  <Skeleton
                    className="rounded-xl"
                    isLoaded={!isOwnerLoading || !isMemberLoading}
                  >
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
                  </Skeleton>
                )}
              </>
            )}
            {isOwner && (
              <Skeleton
                className="shrink-0 rounded-full"
                isLoaded={!isOwnerLoading || !isMemberLoading}
              >
                <CommunityOptionDropdown id={community.id} />
              </Skeleton>
            )}
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
