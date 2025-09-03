import PostForm from "./_components/post-form";

export default async function CreatePostPage({
  params,
}: {
  params: Promise<{ community_id: string }>;
}) {
  return (
    <div className="main-container">
      <div className="w-full">
        <PostForm />
      </div>
      <div className="right-menu-container">d</div>
    </div>
  );
}
