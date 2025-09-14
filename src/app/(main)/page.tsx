import PostCard from "@/features/post-card/post-card";
import { fetchRecentFeeds } from "@/service/fetch-recent-feeds";
import { Divider } from "@heroui/react";

export default async function Home() {
  const feeds = await fetchRecentFeeds(20);

  return (
    <div className="main-container">
      <main className="w-full">
        {feeds &&
          feeds.map((post) => (
            <ul key={post.id}>
              <PostCard post={post} headerInfo="community" />
              <Divider className="my-4" />
            </ul>
          ))}
      </main>
      <div className="right-menu-container">
        <aside className="w-full">info</aside>
      </div>
    </div>
  );
}
