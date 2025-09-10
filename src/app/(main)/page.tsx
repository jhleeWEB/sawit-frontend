import PostCard from "@/features/post-card/post-card";
import { fetchRecentFeeds } from "@/service/fetch-recent-feeds";
import { Divider } from "@heroui/react";
import Link from "next/link";

export default async function Home() {
  const feeds = await fetchRecentFeeds(20);

  return (
    <div className="main-container">
      <main className="w-full">
        {feeds &&
          feeds.map((post) => (
            <Link key={post.id} href={`/p/${post.community_id}/${post.id}`}>
              <PostCard post={post} headerInfo="community" />
              <Divider className="my-4" />
            </Link>
          ))}
      </main>
      <div className="right-menu-container">
        <aside className="w-full">info</aside>
      </div>
    </div>
  );
}
