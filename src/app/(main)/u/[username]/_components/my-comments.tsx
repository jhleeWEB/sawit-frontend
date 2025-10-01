"use client";

import fetchMyComments from "@/service/fetch-my-comments";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import MyComment from "./my-comment";

export default function MyComments({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["my_comments"],
    queryFn: () => fetchMyComments(userId),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {data ? (
        data.map((comment) => (
          <MyComment key={"my_comment_" + comment.id} comment={comment} />
        ))
      ) : (
        <div className="w-full text-center">게시한 댓글이 없습니다.</div>
      )}
    </div>
  );
}
