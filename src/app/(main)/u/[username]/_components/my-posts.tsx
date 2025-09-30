"use client";

import PostCard from "@/features/post-card/post-card";

import fetchMyPosts from "@/service/fetch-my-posts";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

export default function MyPosts({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["my_comments"],
    queryFn: () => fetchMyPosts(userId),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {data ? (
        data.map((post) => <PostCard key={"my_post_" + post.id} post={post} />)
      ) : (
        <div className="w-full text-center">게시한 게시물이 없습니다.</div>
      )}
    </div>
  );
}
