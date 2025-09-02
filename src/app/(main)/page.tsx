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
    <div className="w-full max-w-5xl flex flex-col justify-center overflow-auto">
      <div className="flex">
        <div className="flex flex-col w-[70%] gap-4 px-4">
          {posts.map((Post, i) => (
            <Post key={i} />
          ))}
        </div>
        <div className="flex flex-col w-[30%] bg-teal-100 text-gray-400">
          <div className="sticky top-0 bg-red-300 min-h-[450px]">info</div>
        </div>
      </div>
    </div>
  );
}
