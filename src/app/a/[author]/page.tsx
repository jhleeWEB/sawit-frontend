import ProfileCard from '@/app/a/[author]/_components/ProfileCard';
import PublishedNovelsCard from '@/app/a/[author]/_components/PublishedNovelsCard';

export default async function Author({
	params,
}: {
	params: Promise<{ author: string }>;
}) {
	let { author } = await params;
	author = decodeURIComponent(author);
	return (
		<section className='grid gap-4 p-8'>
			<ProfileCard author={author} />
			<PublishedNovelsCard author={author} />
		</section>
	);
}
