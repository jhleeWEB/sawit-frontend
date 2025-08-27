export default async function PostPage({
  params,
}: {
  params: Promise<{ community_id: string; post_id: string }>;
}) {
  const { post_id } = await params;

  return <section className="flex flex-col gap-4">{post_id}</section>;
}
