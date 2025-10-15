"use client";
import { Button } from "@heroui/react";
import { PiMinusCircle, PiPlusCircle } from "react-icons/pi";
import CommentActionRow from "./comment-action-row";
import { memo, useState } from "react";
import { Comment } from "@/service/fetch_comments";
import CommentHeader from "./comment-header";

function CommentComponent({ commentNode }: { commentNode: CommentNode }) {
  const [toggleReply, setToggleReply] = useState(true);
  const {
    depth,
    comment,

    owner_icon,
    owner_username,
    created_at,
    children,
  } = commentNode;
  const hasChildren = children.length > 0;
  const indent = depth * 40;

  const headerOptions = {
    icon: owner_icon,
    name: owner_username,
    href: `/u/${owner_username}`,
    created_at,
  };
  return (
    <>
      <article style={{ marginLeft: `${indent}px` }}>
        <div className="flex">
          <CommentHeader headerOptions={headerOptions} />
          {hasChildren && (
            <Button
              isIconOnly
              variant="light"
              className="text-neutral-500"
              radius="full"
              startContent={
                toggleReply ? (
                  <PiMinusCircle size={20} />
                ) : (
                  <PiPlusCircle size={20} />
                )
              }
              onPress={() => setToggleReply((prev) => !prev)}
            />
          )}
        </div>
        <div className="flex flex-col ml-10">
          <p>{comment}</p>
          <CommentActionRow comment={commentNode} />
        </div>
      </article>
      {hasChildren &&
        toggleReply &&
        children.map((reply) => (
          <MemoComment key={reply.id} commentNode={reply} />
        ))}
    </>
  );
}

export const MemoComment = memo(CommentComponent);

export type CommentNode = Comment & { children: CommentNode[] };
