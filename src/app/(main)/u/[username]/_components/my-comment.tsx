"use client";
import { IDENTITY } from "@/constants/identifiers";
import { createdAt } from "@/lib/dayjs/date-utils";
import { Comment } from "@/service/fetch_comments";
import uploadCommentDislike from "@/service/post/upload-comment-dislike";
import uploadCommentLike from "@/service/post/upload-comment-like";
import { Avatar, Button, Link } from "@heroui/react";
import { useState } from "react";
import { PiArrowFatDownThin, PiArrowFatUpThin } from "react-icons/pi";

export default function MyComment({ comment }: { comment: Comment }) {
  const {
    post_id,
    post_title,
    community_id,
    community_name,
    community_icon,
    owner_username,
    created_at,
    id,
  } = comment;
  const [likes, setLikes] = useState(() => comment.likes - comment.dislikes);
  return (
    <article key={"my_comment_" + id} className="border-b-1 pb-2 mb-2">
      <section className="flex items-center gap-2">
        <Avatar src={community_icon} size="sm" />
        <Link
          className=" text-sm font-semibold"
          href={`/c/${community_id}/${post_id}`}
          color="foreground"
        >
          {IDENTITY.COMMUNITY}
          {community_name}
        </Link>
        <span>·</span>
        <small>{post_title}</small>
      </section>
      <section className="flex items-center gap-1">
        <Link
          href={`/u/${owner_username}`}
          className="text-sm font-semibold"
          color="foreground"
        >
          {owner_username}
        </Link>
        <small>님이</small>
        <small>{createdAt(created_at)}</small>
        <small>댓글 남김</small>
      </section>
      <p>{comment.comment}</p>
      <section className="relative flex left-[-8px]">
        <div className="flex items-center">
          <Button
            variant="light"
            radius="full"
            isIconOnly
            size="sm"
            startContent={
              <PiArrowFatUpThin size={18} className="hover:text-red-500" />
            }
            onPress={async () => {
              const res = await uploadCommentLike({ commentId: id });
              if (res === "cancelled") {
                setLikes((prev) => prev - 1);
              } else {
                setLikes((prev) => prev + 1);
              }
            }}
          />
          <small className="mx-1">{likes}</small>
          <Button
            variant="light"
            radius="full"
            size="sm"
            isIconOnly
            startContent={
              <PiArrowFatDownThin size={18} className="hover:text-blue-500" />
            }
            onPress={async () => {
              const res = await uploadCommentDislike({ commentId: id });
              if (res === "disliked") {
                setLikes((prev) => prev - 1);
              } else {
                setLikes((prev) => prev + 1);
              }
            }}
          />
        </div>
      </section>
    </article>
  );
}
