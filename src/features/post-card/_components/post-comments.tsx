"use client";

import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import fetchComments, { Comment } from "@/service/fetch_comments";
import CommentActionRow from "./comment-action-row";

interface Props {
  postId: number;
}

export default function PostComments({ postId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", "comments"],
    queryFn: () => fetchComments(postId),
  });
  if (!data) {
    return;
  }
  return (
    <div className="w-full mt-4">
      {data.map((comment) => {
        return (
          <article key={comment.id}>
            <Header
              icon={comment.owner_icon}
              name={comment.owner_username}
              created_at={comment.created_at}
            />
            <div className="flex flex-col ml-10">
              <p>comment here</p>
              <CommentActionRow />
            </div>
          </article>
        );
      })}
    </div>
  );
}
