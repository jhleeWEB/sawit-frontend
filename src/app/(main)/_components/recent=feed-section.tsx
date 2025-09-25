import PostCard from "@/features/post-card/post-card";
import { fetchRecentFeeds } from "@/service/fetch-recent-feeds";

export default async function RecentFeedSection() {
  const feeds = await fetchRecentFeeds(20);
  return (
    <section>
      {feeds &&
        feeds.map((post) => (
          <PostCard
            key={"post_" + post.id}
            post={post}
            headerInfo="community"
          />
        ))}
    </section>
  );
}
