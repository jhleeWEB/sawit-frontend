import ChipShortcuts from './_components/chips-shortcuts';
import RecentTop6Novels from './_components/recent-top-6-novels';
import MillionPagesNovels from './_components/million-pages-novels';
import RecentEvents from './_components/recent-events';
import NovelPanels from './_components/novel-panels/novel-panels';

export default function Home() {
	return (
		<section className='w-full flex flex-col gap-2'>
			<ChipShortcuts />
			<RecentEvents />
			<RecentTop6Novels />
			<MillionPagesNovels />
			<NovelPanels title='무료 웹소설' items={[1, 2, 3, 4, 5, 6]} />
			<NovelPanels title='스포츠 웹소설' items={[1, 2, 3, 4, 5, 6]} />
			<NovelPanels title='로맨스 웹소설' items={[1, 2, 3, 4, 5, 6]} />
			<NovelPanels title='성인 웹소설' items={[1, 2, 3, 4, 5, 6]} />
		</section>
	);
}
