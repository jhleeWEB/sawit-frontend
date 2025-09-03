import PostForm from "../p/[community_id]/create/_components/post-form";

export default async function CreatePostPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex h-full w-[1280px mx-auto">
        <div className="flex flex-col min-w-[800px] max-w-[1180px] gap-4 px-4 overflow-auto">
          <PostForm />
        </div>
        <div className="flex flex-col w-[300px] max-h-dvh bg-teal-100 text-gray-400">
          d
        </div>
      </div>
    </div>
  );
}
