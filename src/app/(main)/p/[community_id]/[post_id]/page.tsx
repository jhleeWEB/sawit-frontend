import PostTitleHeader from "./_components/post-title-header";
import PostContentBody from "./_components/post-content-body";
import fetchPost from "./_apis/fetch_post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ community_id: string; post_id: string }>;
}) {
  const { post_id, community_id } = await params;
  const post = await fetchPost(post_id, community_id);
  if (!post) {
    return;
  }

  return (
    <div className="w-full max-w-5xl flex flex-col justify-center">
      <div className="flex">
        <div className="flex flex-col w-[70%] gap-4 px-4">
          <PostTitleHeader post={post} />
          <PostContentBody post={post} />
        </div>
        <div className="flex flex-col w-[30%] bg-teal-100 text-gray-400">d</div>
      </div>
    </div>
  );
}
