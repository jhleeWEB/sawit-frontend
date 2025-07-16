export default async function Book({
	params,
}: {
	params: Promise<{ author: string; book: string }>;
}) {
	const { author, book } = await params;
	return (
		<div>
			param: {book} wrote by {author}
		</div>
	);
}
