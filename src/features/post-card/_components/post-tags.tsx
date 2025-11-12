"use client";

import { Post } from "@/service/fetch_post";
import { Chip } from "@heroui/react";

export function PostTags({ post }: { post: Post }) {
  const { is_nsfw, is_spoiler } = post;

  return (
    <section className="my-2 flex w-full gap-2">
      {is_nsfw && (
        <Chip size="sm" color="danger">
          후방주의
        </Chip>
      )}
      {is_spoiler && (
        <Chip size="sm" color="warning">
          스포일러
        </Chip>
      )}
    </section>
  );
}
