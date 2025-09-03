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
    <div className="w-full flex-1 grid grid-cols-[minmax(0,760px)_minmax(0,320px)] place-content-between gap-6">
      <main className="w-full">
        {posts.map((Post, i) => (
          <Post key={i} />
        ))}
      </main>
      <div className="flex flex-col  justify-start sticky top-[64px] overflow-x-hidden overflow-y-auto max-w-[320px] min-h-[calc(100dvh-64px-1px)] max-h-[calc(100dvh-64px-1px)]">
        <aside className="sticky top-0 bg-red-300 min-h-[450px]">info</aside>
      </div>
    </div>
  );
}
