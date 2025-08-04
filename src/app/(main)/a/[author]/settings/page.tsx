export default async function Settings({
	params,
}: {
	params: Promise<{ author: string }>;
}) {
	const { author } = await params;
	return <div>param: {author} setting page</div>;
}
