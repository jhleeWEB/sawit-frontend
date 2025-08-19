import ChipShortcuts from './_components/chips-shortcuts';
import RecentTop6Novels from './_components/recent-top-6-novels';
import MillionPagesNovels from './_components/million-pages-novels';
import RecentEvents from './_components/recent-events';
import NovelPanels from './_components/novel-panels/novel-panels';
import { NovelSample } from './p/[post_name]/page';
import ContentContainer from './_components/content-container';

const sample1 = [
	'/cover_thumbnails/novel_cover_thumbnail_22.png',
	'/cover_thumbnails/novel_cover_thumbnail_23.png',
	'/cover_thumbnails/novel_cover_thumbnail_24.png',
	'/cover_thumbnails/novel_cover_thumbnail_25.png',
	'/cover_thumbnails/novel_cover_thumbnail_26.png',
	'/cover_thumbnails/novel_cover_thumbnail_27.png',
];
const sample2 = [
	'/cover_thumbnails/novel_cover_thumbnail_28.png',
	'/cover_thumbnails/novel_cover_thumbnail_29.png',
	'/cover_thumbnails/novel_cover_thumbnail_30.png',
	'/cover_thumbnails/novel_cover_thumbnail_31.png',
	'/cover_thumbnails/novel_cover_thumbnail_32.png',
	'/cover_thumbnails/novel_cover_thumbnail_1.png',
];
const sample3 = [
	'/cover_thumbnails/novel_cover_thumbnail_2.png',
	'/cover_thumbnails/novel_cover_thumbnail_3.png',
	'/cover_thumbnails/novel_cover_thumbnail_4.png',
	'/cover_thumbnails/novel_cover_thumbnail_5.png',
	'/cover_thumbnails/novel_cover_thumbnail_6.png',
	'/cover_thumbnails/novel_cover_thumbnail_7.png',
];
const sample4 = [
	'/cover_thumbnails/novel_cover_thumbnail_8.png',
	'/cover_thumbnails/novel_cover_thumbnail_9.png',
	'/cover_thumbnails/novel_cover_thumbnail_10.png',
	'/cover_thumbnails/novel_cover_thumbnail_11.png',
	'/cover_thumbnails/novel_cover_thumbnail_12.png',
	'/cover_thumbnails/novel_cover_thumbnail_13.png',
];

export default async function Home() {
	const freeNovelData = fetchTopFreeNovels();
	const sportsNovelData = fetchTopSportsNovels();
	const romanceNovelData = fetchTopRomanceNovels();
	const adultNovelData = fetchTopAdultNovels();
	const [freeNovels, sportsNovels, romanceNovels, adultNovels] =
		await Promise.all([
			freeNovelData,
			sportsNovelData,
			romanceNovelData,
			adultNovelData,
		]);
	return (
		<div className='w-full h-full grid grid-cols-3 overflow-y-auto scrollbar-hide'>
			<div className='col-span-3'>
				<div className='bg-red-200 min-h-[64px] w-full'>header</div>
			</div>
			<div className='col-start-1 col-span-2'>
				<ChipShortcuts />
				<RecentEvents />
				<RecentTop6Novels />
				<MillionPagesNovels />
				<NovelPanels title='무료 웹소설' novels={freeNovels} images={sample1} />
				<NovelPanels
					title='스포츠 웹소설'
					novels={sportsNovels}
					images={sample2}
				/>
				<NovelPanels
					title='로맨스 웹소설'
					novels={romanceNovels}
					images={sample3}
				/>
				<NovelPanels
					title='성인 웹소설'
					novels={adultNovels}
					images={sample4}
				/>
			</div>
			<div className='col-start-3 col-span-1 bg-teal-100 flex flex-col'>
				<div className='sticky top-0 bg-red-300 min-h-[450px]'>info</div>
			</div>
		</div>
	);
}

async function fetchTopFreeNovels(): Promise<NovelSample[]> {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).slice(0, 6);
}

async function fetchTopSportsNovels(): Promise<NovelSample[]> {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).slice(7, 13);
}

async function fetchTopRomanceNovels(): Promise<NovelSample[]> {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).slice(13, 19);
}

async function fetchTopAdultNovels(): Promise<NovelSample[]> {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).slice(19, 25);
}
