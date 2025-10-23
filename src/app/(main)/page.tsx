import FeedSection from "@/components/feed-section";
import { fetchNextFeeds, fetchRecentFeeds } from "@/service/fetch-recent-feeds";

export default async function Home() {
  const feeds = await fetchRecentFeeds({ pageSize: 15 });
  return (
    <div className="main-container">
      <main className="w-full">
        {feeds && (
          <FeedSection initialFeeds={feeds} queryAction={fetchNextFeeds} />
        )}
      </main>
      <div className="right-menu-container">
        <aside className="w-full"></aside>
      </div>
    </div>
  );
}
