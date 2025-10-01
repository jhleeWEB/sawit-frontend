"use client";

import PostCard from "@/features/post-card/post-card";
import fetchMyLikedContents from "@/service/fetch-my-liked-contents";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import MyComment from "./my-comment";

export default function MyLikedContents({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["my_liked_contents"],
    queryFn: () => fetchMyLikedContents(userId),
  });
  if (isLoading) return <Spinner />;

  return (
    <div>
      {data ? (
        data.map((content) => {
          if (content.comment) {
            return (
              <MyComment key={"my_comment_" + content.id} comment={content} />
            );
          } else {
            return <PostCard key={"my_post_" + content.id} post={content} />;
          }
        })
      ) : (
        <div className="w-full text-center">
          좋아요를 누른 게시물이 없습니다.
        </div>
      )}
    </div>
  );
}
