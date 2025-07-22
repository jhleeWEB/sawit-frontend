export default async function Settings({
	params,
}: {
	params: Promise<{ book: string }>;
}) {
	const { book } = await params;
	return <div>param: {book} settings page</div>;
}
