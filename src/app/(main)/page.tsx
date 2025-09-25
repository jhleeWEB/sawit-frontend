import RecentFeedSection from "./_components/recent-feed-section";

export default async function Home() {
  return (
    <div className="main-container">
      <main className="w-full">
        <RecentFeedSection />
      </main>
      <div className="right-menu-container">
        <aside className="w-full"></aside>
      </div>
    </div>
  );
}
