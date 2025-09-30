"use client";

import { createdAt } from "@/lib/dayjs/date-utils";
import fetchMyComments from "@/service/fetch-my-comments";
import { Avatar, Link, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

export default function MyComments({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["my_comments"],
    queryFn: () => fetchMyComments(userId),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {data ? (
        data.map((comment) => {
          return (
            <article
              key={"my_comment_" + comment.id}
              className="border-b-1 pb-2 mb-2"
            >
              <section className="flex items-center gap-2">
                <Avatar src={comment.community_icon} size="sm" />
                <Link
                  className=" text-sm font-semibold"
                  href={`/p/${comment.community_id}`}
                  color="foreground"
                >
                  {comment.community_name}
                </Link>
                <span>·</span>
                <small>{comment.post_title}</small>
              </section>
              <section className="flex items-center gap-1">
                <Link
                  href={`/u/${comment.owner_id}`}
                  className="text-sm font-semibold"
                  color="foreground"
                >
                  {comment.owner_username}
                </Link>
                <small>님이</small>
                <small>{createdAt(comment.created_at)}</small>
                <small>댓글 남김</small>
              </section>
              {comment.comment}
            </article>
          );
        })
      ) : (
        <div className="w-full text-center">게시한 댓글이 없습니다.</div>
      )}
    </div>
  );
}
