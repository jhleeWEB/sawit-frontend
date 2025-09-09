import checkDraft from "@/service/check-draft";
import PostForm from "./_components/post-form";

export default async function CreatePostPage() {
  const draft = await checkDraft();

  return (
    <div className="main-container">
      <div className="w-full px-16">
        <PostForm draft={draft} />
      </div>
      <div className="right-menu-container">d</div>
    </div>
  );
}
