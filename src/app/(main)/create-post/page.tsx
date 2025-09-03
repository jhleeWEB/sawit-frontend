import PostForm from "../p/[community_id]/create/_components/post-form";

export default async function CreatePostPage() {
  return (
    <div className="w-full max-w-5xl flex flex-col justify-center">
      <div className="flex">
        <div className="flex flex-col w-[70%] gap-4 px-4">
          <PostForm />
        </div>
        <div className="flex flex-col w-[30%] bg-teal-100 text-gray-400">d</div>
      </div>
    </div>
  );
}
