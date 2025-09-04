import PostForm from "../p/[community_id]/create/_components/post-form";

export default async function CreatePostPage() {
  return (
    <div className="main-container">
      <main className="w-full py-8">
        <h1 className="text-2xl font-bold mb-4">게시물 만들기</h1>
        <PostForm />
      </main>
      <div className="right-menu-container">d</div>
    </div>
  );
}
