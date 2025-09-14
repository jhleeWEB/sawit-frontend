export default async function PostEditPage({
  params,
}: {
  params: Promise<{ community_id: number; post_id: number }>;
}) {
  const { community_id, post_id } = await params;

  return (
    <div>
      param: {community_id}
      {post_id}
    </div>
  );
}
