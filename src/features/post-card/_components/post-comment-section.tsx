"use client";

import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import fetchComments, { Comment } from "@/service/fetch_comments";
import CommentActionRow from "./comment-action-row";
import { memo, useMemo, useState } from "react";
import { PiPlusCircle, PiMinusCircle } from "react-icons/pi";
import { Button } from "@heroui/react";

interface Props {
  postId: number;
}

export default function PostCommentSection({ postId }: Props) {
  const { data } = useQuery({
    queryKey: ["post", "comments"],
    queryFn: () => fetchComments(postId),
  });
  const tree = useMemo(() => (data ? buildTree(data) : []), [data]);

  return (
    <section className="w-full mt-4">
      {tree.map((comment) => (
        <MemoComment key={comment.id} commentNode={comment} />
      ))}
    </section>
  );
}

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
  return (
    <>
      <article style={{ marginLeft: `${indent}px` }}>
        <div className="flex">
          <Header
            icon={owner_icon}
            name={owner_username}
            created_at={created_at}
          />
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

const MemoComment = memo(CommentComponent);

export type CommentNode = Comment & { children: CommentNode[] };

export function buildTree(rows: Comment[]): CommentNode[] {
  const byId = new Map<number, CommentNode>();
  const roots: CommentNode[] = [];

  for (const r of rows) {
    const node: CommentNode = { ...r, children: [] };
    byId.set(r.id, node);
    if (r.parent_id == null) roots.push(node);
    else byId.get(r.parent_id)?.children.push(node);
  }
  return roots;
}
