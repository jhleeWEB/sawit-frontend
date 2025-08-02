import Editor from './_components/editor';

export default async function Publish({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<section>
			<Editor />
		</section>
	);
}
