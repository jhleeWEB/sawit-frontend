import { fetchRecentFeeds } from "@/service/fetch-recent-feeds";
import FeedSection from "../../components/feed-section";

export default async function Home() {
  const feeds = await fetchRecentFeeds({ pageSize: 15, feedType: "recent" });
  return (
    <div className="main-container">
      <main className="w-full">
        {feeds && <FeedSection initialFeeds={feeds} feedType="recent" />}
      </main>
      <div className="right-menu-container">
        <aside className="w-full"></aside>
      </div>
    </div>
  );
}
