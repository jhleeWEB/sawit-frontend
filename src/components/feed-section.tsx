"use client";

import { useInfinitePosts } from "@/app/hooks/use-infinite-posts";
import PostCard from "@/features/post-card/post-card";
import { Post } from "@/service/fetch_post";
import { Spinner } from "@heroui/react";
import { useEffect, useRef } from "react";

export default function FeedSection({
  initialFeeds,
  communityId,
  queryAction,
}: {
  initialFeeds: Post[];
  queryAction: (arg: any) => Promise<any>;

  communityId?: number;
}) {
  const { pages, hasMore, isLoading, error, loadMore } = useInfinitePosts({
    initialPage: initialFeeds,
    queryAction,
    pageSize: 10,
    communityId,
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    if (!anchorRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const f = entries[0];
        if (f.isIntersecting) loadMore();
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0 },
    );
    io.observe(anchorRef.current);

    return () => io.disconnect();
  }, [hasMore, loadMore]);

  return (
    <section className="px-2 sm:px-0">
      {pages &&
        pages.map((post) => (
          <PostCard key={"post_" + post.id} post={post} headerInfo={"user"} />
        ))}
      {hasMore && <div ref={anchorRef} className="h-10" />}
      <div className="flex justify-center">
        {isLoading && <Spinner />}
        <small className="mb-4 text-neutral-400">{error}</small>
      </div>
    </section>
  );
}
