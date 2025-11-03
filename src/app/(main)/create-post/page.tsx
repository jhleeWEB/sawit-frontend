import PostFormProvider from "../c/[community_id]/create/_components/form-provider";
import PostForm from "../c/[community_id]/create/_components/post-form";
import { PostSettings } from "../c/[community_id]/create/_components/post-settings";

export default async function CreatePostPage() {
  return (
    <div className="main-container">
      <PostFormProvider>
        <main className="w-full">
          <h1 className="mb-4 text-2xl font-bold">게시물 만들기</h1>
          <PostForm />
        </main>
        <div className="right-menu-container">
          <PostSettings />
        </div>
      </PostFormProvider>
    </div>
  );
}
