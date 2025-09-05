import Post from "@/features/user-post";

export default async function Home() {
  const posts = [
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
    Post,
  ];
  return (
    <div className="main-container">
      <main className="w-full"></main>
      <div className="right-menu-container">
        <aside className="w-full">info</aside>
      </div>
    </div>
  );
}
