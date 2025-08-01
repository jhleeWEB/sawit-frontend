import CarouselEvents from './_components/carousel-events';
import ChipShortcuts from './_components/chips-shortcuts';
import RecentTop6Novels from './_components/recent-top-6-novels';
import MillionPagesNovels from './_components/million-pages-novels';

export default function Home() {
	return (
		<section className='w-full flex flex-col gap-2'>
			<ChipShortcuts />
			<CarouselEvents />
			<RecentTop6Novels />
			<MillionPagesNovels />
		</section>
	);
}
