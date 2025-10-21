import { fetchNextFeeds } from "@/service/fetch-recent-feeds";
import { Post } from "@/service/fetch_post";
import { useCallback, useEffect, useRef, useState } from "react";
import { FeedType } from "../../components/feed-section";

interface Params {
  initialPage: Post[];
  pageSize?: number;
  feedType?: FeedType;
}

export function useInfinitePosts({
  initialPage,
  pageSize = 20,
  feedType = "recent",
}: Params) {
  const [pages, setPages] = useState<Post[] | []>(initialPage);
  const [nextCursor, setNextCursor] = useState(
    initialPage[initialPage.length - 1].created_at,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const abortRef = useRef(new AbortController());

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    abortRef.current.abort();

    const posts = await fetchNextFeeds({
      lastCreatedAt: nextCursor,
      pageSize,
      feedType,
    });

    if (!posts || posts.length === 0) {
      setError("더 이상 피드가 없습니다.");
      setHasMore(false);
      setIsLoading(false);
      abortRef.current.abort();
      return;
    }

    setPages((prev) => [...prev, ...posts]);
    setHasMore(true);
    setIsLoading(false);
  }, [nextCursor, isLoading, pageSize]);

  useEffect(() => {
    setNextCursor(pages[pages.length - 1].created_at);
  }, [pages]);

  return { pages, isLoading, error, hasMore, loadMore };
}
