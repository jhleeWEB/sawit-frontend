import ChipShortcuts from './_components/chips-shortcuts';
import RecentTop6Novels from './_components/recent-top-6-novels';
import MillionPagesNovels from './_components/million-pages-novels';
import RecentEvents from './_components/recent-events';
import NovelPanels from './_components/novel-panels/novel-panels';
import Post from '@/features/post';

export default async function Home() {
	const posts = [
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
	];
	return (
		<div className='flex flex-col col-start-1 col-span-2 gap-4 px-4'>
			{posts.map((Post, i) => (
				<Post key={i} />
			))}
		</div>
	);
}
