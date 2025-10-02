"use client";

import { Button, useDisclosure } from "@heroui/react";
import MediaCarousel from "./media-carousel";
import {
  PiArrowFatLineDownThin,
  PiArrowFatLineUpThin,
  PiChatCircleDotsThin,
  PiShareFatThin,
} from "react-icons/pi";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "@/service/fetch_post";
import postLikes from "@/service/post_likes";
import postDislikes from "@/service/post_dislikes";
import Link from "next/link";
import SocialLoginModal from "@/components/modals/social-login-modal";

interface Props {
  post: Post;
}

export default function PostContentBody({ post }: Props) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const { id: post_id } = post;
  const { data: session } = useSession();
  const [likes, setLikes] = useState(() => post.likes - post.dislikes);
  const postHref = `/c/${post.community_id}/${post.id}`;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLikeAndDisLikeButton = useCallback(
    async (type: "likes" | "dislikes") => {
      if (!session) {
        onOpen();
        return;
      }
      if (type === "likes") {
        const result = await postLikes(post_id);
        if (result === "cancelled") {
          setLikes((prev) => prev - 1);
        } else if (result === "liked") {
          setLikes((prev) => prev + 1);
        }
      } else {
        const result = await postDislikes(post_id);
        if (result === "cancelled") {
          setLikes((prev) => prev + 1);
        } else if (result === "disliked") {
          setLikes((prev) => prev - 1);
        }
      }
    },
    [onOpen, setLikes, session, post_id]
  );

  useEffect(() => {
    if (pRef.current) {
      pRef.current.innerHTML = post.text || "";
    }
  }, [post]);

  return (
    <div className="flex flex-col">
      {post.type === "media" && (
        <MediaCarousel href={postHref} urls={post.media_urls} />
      )}
      {post.type === "text" && (
        <div className="rounded-2xl">
          <p ref={pRef}></p>
        </div>
      )}
      {/* 하단 버튼 그룹 */}
      <div className="flex gap-2 mt-4">
        {/* 올려/내려 버튼 그룹 */}
        <div className="flex items-center bg-neutral-200 rounded-full">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="bg-neutral-200 hover:bg-neutral-100"
            onPress={() => handleLikeAndDisLikeButton("likes")}
          >
            <PiArrowFatLineUpThin size={20} className="hover:text-red-500" />
          </Button>
          <small>{likes}</small>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="bg-neutral-200 hover:bg-neutral-100"
            onPress={() => handleLikeAndDisLikeButton("dislikes")}
          >
            <PiArrowFatLineDownThin size={20} className="hover:text-blue-500" />
          </Button>
        </div>
        {/* 댓글 버튼 */}
        <Button
          radius="full"
          size="sm"
          className="bg-neutral-200 hover:bg-neutral-100"
          as={Link}
          href={`/c/${post.community_id}/${post.id}`}
        >
          <PiChatCircleDotsThin size={20} />
          <small className="text-[13px]">{post.comments}</small>
        </Button>
        {/* 공유하기 버튼 */}
        <Button
          radius="full"
          size="sm"
          className="bg-neutral-200 hover:bg-neutral-100"
        >
          <PiShareFatThin size={20} />
          <small className="text-[13px]">공유</small>
        </Button>
      </div>
      <SocialLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
