"use client";

import { Button } from "@heroui/react";
import MediaCarousel from "./media-carousel";
import {
  PiArrowFatLineDownThin,
  PiArrowFatLineUpThin,
  PiChatCircleDotsThin,
  PiShareFatThin,
} from "react-icons/pi";

import { useSession } from "next-auth/react";

import { useState } from "react";
import { Post } from "@/service/fetch_post";
import postLikes from "@/service/post_likes";
import postDislikes from "@/service/post_dislikes";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function PostContentBody({ post }: Props) {
  const { id: post_id } = post;
  const session = useSession();
  const [likes, setLikes] = useState(() => post.likes - post.dislikes);
  const postHref = `/p/${post.community_id}/${post.id}`;
  if (!session) {
    return;
  }

  return (
    <div className="flex flex-col">
      <MediaCarousel href={postHref} urls={post.media_urls} />
      {post.text && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: post.text || "" }}></p>
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
            onPress={async () => {
              const result = await postLikes(post_id);
              if (result === "cancelled") {
                setLikes((prev) => prev - 1);
              } else if (result === "liked") {
                setLikes((prev) => prev + 1);
              }
            }}
          >
            <PiArrowFatLineUpThin size={20} className="hover:text-red-500" />
          </Button>
          <small>{likes}</small>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="bg-neutral-200 hover:bg-neutral-100"
            onPress={async () => {
              const result = await postDislikes(post_id);
              if (result === "cancelled") {
                setLikes((prev) => prev + 1);
              } else if (result === "disliked") {
                setLikes((prev) => prev - 1);
              }
            }}
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
          href={`/p/${post.community_id}/${post.id}`}
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
    </div>
  );
}
