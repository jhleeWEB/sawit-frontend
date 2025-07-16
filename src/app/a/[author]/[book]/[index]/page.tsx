export default async function BookPage({
	params,
}: {
	params: Promise<{ book: string; index: string }>;
}) {
	const { book, index } = await params;
	return (
		<div>
			param: {book} page {index}
		</div>
	);
}
