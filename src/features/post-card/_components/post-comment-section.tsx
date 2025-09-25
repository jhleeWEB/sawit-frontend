"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchComments, { Comment } from "@/service/fetch_comments";
import { CommentNode, MemoComment } from "./memo-comment";

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
