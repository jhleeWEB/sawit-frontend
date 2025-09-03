import Post from "@/features/post";

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
      <main className="w-full">
        {posts.map((Post, i) => (
          <Post key={i} />
        ))}
      </main>
      <div className="right-menu-container">
        <aside className="w-full">info</aside>
      </div>
    </div>
  );
}
