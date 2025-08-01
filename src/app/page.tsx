import ChipShortcuts from './_components/chips-shortcuts';
import RecentTop6Novels from './_components/recent-top-6-novels';
import MillionPagesNovels from './_components/million-pages-novels';
import RecentEvents from './_components/recent-events';

export default function Home() {
	return (
		<section className='w-full flex flex-col gap-2'>
			<ChipShortcuts />
			<RecentEvents />
			<RecentTop6Novels />
			<MillionPagesNovels />
		</section>
	);
}
