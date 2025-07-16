export default async function Publish({
	params,
}: {
	params: Promise<{ author: string }>;
}) {
	const { author } = await params;
	return <div>param: {author} publish editor page</div>;
}
