import { NovelSample } from '@/hooks/useNovelSamples';
import { Image } from '@heroui/react';
import { IoEyeOutline, IoStarOutline, IoHeartOutline } from 'react-icons/io5';
import Link from 'next/link';
import { formatToKoreanUnits } from '@/utils/format-to-korean-unit';

export default async function Book({
	params,
}: {
	params: Promise<{ author: string; id: string }>;
}) {
	const { id } = await params;

	const volumnTitleData = fetchVolumnTitles(id);
	const novelData = fetchNovelInfo(id);

	const [volumnTitles, novel] = await Promise.all([volumnTitleData, novelData]);

	if (!novel || !volumnTitles) {
		return;
	}

	return (
		<section className='flex flex-col gap-4'>
			<div className='rounded-xl bg-slate-100 bg-top bg-[url(https://heroui.com/images/hero-card-complete.jpeg)] bg-no-repeat'>
				<div className='flex w-full h-full gap-2 p-4 rounded-xl bg-white/70 backdrop-blur-md'>
					<div className='relative'>
						<Image
							alt='Card background'
							className='object-cover rounded-xl'
							src='https://heroui.com/images/hero-card-complete.jpeg'
							height={280}
							isZoomed
						/>
					</div>
					<div className='flex flex-col justify-between'>
						<IoHeartOutline
							size={32}
							className='absolute right-4 cursor-pointer'
						/>
						<div>
							<small>{new Date(novel.created_at).toDateString()}</small>
							<div className='flex gap-x-1'>
								{novel.about.category.map((n) => (
									<small key={novel.title + n}>{n}</small>
								))}
							</div>
						</div>
						<div>
							<h3 className='text-xl font-bold'>{novel?.title}</h3>
							<small>{novel?.author}</small>
							<h4>{novel.about.description}</h4>
						</div>
						<div className='flex flex-wrap gap-2 items-end [&>div]:text-gray-600'>
							<div className='bg-white shadow-sm bg-opacity-10 px-2 rounded-lg'>
								<label className='text-xs'>별점: </label>
								<small>{novel.stats.stars.toLocaleString()}</small>
							</div>
							<div className='bg-white shadow-sm bg-opacity-10 px-2 rounded-lg'>
								<label className='text-xs'>뷰: </label>
								<small>{formatToKoreanUnits(novel.stats.views)}</small>
							</div>
							<div className='bg-white shadow-sm bg-opacity-10 px-2 rounded-lg'>
								<label className='text-xs'>추천: </label>
								<small>{novel.stats.recommends.toLocaleString()}</small>
							</div>
							<div className='bg-white shadow-sm bg-opacity-10 px-2 rounded-lg'>
								<label className='text-xs'>북마크: </label>
								<small>{novel.stats.bookmarks.toLocaleString()}</small>
							</div>
							<div className='bg-white shadow-sm bg-opacity-10 px-2 rounded-lg'>
								<label className='text-xs'>글자수: </label>
								<small>{novel.stats.word_count.toLocaleString()}</small>
							</div>
							<div className='bg-white shadow-sm bg-opacity-10 px-2 rounded-lg'>
								<label className='text-xs'>회차: </label>
								<small>{novel.stats.series_count.toLocaleString()}</small>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='rounded-xl bg-slate-100 p-4'>
				<h1 className='font-bold text-sm'>전체 {volumnTitles.length}</h1>
				<ul>
					{volumnTitles.map((volumn, i) => (
						<li
							key={volumn.id + volumn.title}
							className='cursor-pointer hover:bg-slate-50 border-b-1 py-2'
						>
							<Link href={`${novel.id}/volumn/?volumnNo=${volumn.no}`}>
								{volumn.title} {i + 1}화
								<div className='flex gap-2 [&_small]:text-xs text-gray-500'>
									<span className='flex items-center gap-1'>
										<IoStarOutline />
										<small>{volumn.rating}</small>
									</span>
									<span className='flex items-center gap-1'>
										<IoEyeOutline />
										<small>{volumn.views.toLocaleString()}</small>
									</span>
									<span>
										<small>{new Date(volumn.updated_at).toDateString()}</small>
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export type VolumnTitleSample = {
	novel_id: string;
	id: number;
	no: number;
	title: string;
	blob: number;
	created_at: Date;
	updated_at: Date;
	views: number;
	rating: number;
};

async function fetchVolumnTitles(novelId: string) {
	const data = await import('/public/samples/volumn_titles_info.json');
	return (Array.from(data) as VolumnTitleSample[]).filter(
		(n) => n.novel_id == novelId
	);
}
async function fetchNovelInfo(novelId: string) {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).find((n) => n.id == novelId);
}
