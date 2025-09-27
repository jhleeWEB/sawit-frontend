"use client";

import { createdAt } from "@/lib/dayjs/date-utils";
import { Community } from "@/service/fetch-community";

import joinCommunity from "@/service/join-community";
import {
  addToast,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { BsCalendar4Event, BsPersonVcard } from "react-icons/bs";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  community: Community;
  redirectUrl?: string;
}
export default function JoinCommunityModal(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { community } = props;

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              style={{
                backgroundImage: `url("${community.banner_url}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              커뮤니티 가입
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center mb-4 gap-2 ">
                <Avatar src={community.icon_url} size="lg" />
                <h3 className="text-xl font-semibold">{community.name}</h3>
              </div>
              <div className="flex flex-col mb-2 text-neutral-500">
                <small>{community.description}</small>
              </div>

              <div className="flex items-center gap-2 text-neutral-500">
                <small>회원{community.member_count}</small>

                <small>게시물{community.post_count}</small>
                <div className="flex items-center gap-1 ">
                  <BsCalendar4Event size={18} />
                  <small>개설</small>
                  <small>{createdAt(community.created_at)}</small>
                </div>
                <div className="flex items-center gap-1">
                  <BsPersonVcard size={18} />
                  <small>주인</small>
                  <small>{community.owner_username}</small>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                onPress={async () => {
                  setIsLoading(true);
                  const result = await joinCommunity(community.id);
                  if (result) {
                    addToast({
                      title: "커뮤니티 가입",
                      description: "커뮤니티에 정상적으로 가입되었습니다.",
                      color: "success",
                    });
                  } else {
                    addToast({
                      title: "커뮤니티 가입",
                      description: "커뮤니티에 가입하지 못했습니다.",
                      color: "danger",
                    });
                  }
                  setIsLoading(false);
                  onClose();
                }}
              >
                가입하기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
