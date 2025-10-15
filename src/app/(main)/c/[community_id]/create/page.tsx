import PostFormProvider from "./_components/form-provider";
import PostForm from "./_components/post-form";

export default async function CreatePostPage({}: {
  params: Promise<{ community_id: string; post_id: string }>;
}) {
  return (
    <div className="main-container">
      <div className="w-full px-16">
        <PostFormProvider>
          <PostForm />
        </PostFormProvider>
      </div>
      <div className="right-menu-container">d</div>
    </div>
  );
}
