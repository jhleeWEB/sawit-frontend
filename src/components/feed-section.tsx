"use client";
import { useInfinitePosts } from "@/app/hooks/use-infinate-posts";
import PostCard from "@/features/post-card/post-card";
import { Post } from "@/service/fetch_post";
import { Spinner } from "@heroui/react";
import { useEffect, useRef } from "react";

export type FeedType = "community" | "user" | "recent" | "popular";

export default function FeedSection({
  initialFeeds,
  feedType = "recent",
  communityId,
}: {
  initialFeeds: Post[];
  feedType?: FeedType;
  communityId?: number;
}) {
  const { pages, hasMore, isLoading, error, loadMore } = useInfinitePosts({
    initialPage: initialFeeds,
    pageSize: 10,
    feedType,
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
          <PostCard
            key={"post_" + post.id}
            post={post}
            headerInfo={feedType == "recent" ? "community" : "user"}
          />
        ))}
      {hasMore && <div ref={anchorRef} className="h-10" />}
      <div className="flex justify-center">
        {isLoading && <Spinner />}
        <small className="mb-4 text-neutral-400">{error}</small>
      </div>
    </section>
  );
}
