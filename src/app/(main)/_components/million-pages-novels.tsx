import { Image, Tooltip } from '@heroui/react';
import { NovelSample } from '../a/[author]/page';
import Link from 'next/link';

const uris = [
	'/cover_thumbnails/novel_cover_thumbnail_14.png',
	'/cover_thumbnails/novel_cover_thumbnail_15.png',
	'/cover_thumbnails/novel_cover_thumbnail_16.png',
	'/cover_thumbnails/novel_cover_thumbnail_17.png',
	'/cover_thumbnails/novel_cover_thumbnail_18.png',
	'/cover_thumbnails/novel_cover_thumbnail_19.png',
	'/cover_thumbnails/novel_cover_thumbnail_20.png',
	'/cover_thumbnails/novel_cover_thumbnail_21.png',
];

export default async function MillionPagesNovels() {
	const novelDatas = await fetchNovelDatas();

	return (
		<div>
			<h1 className='font-bold text-lg mt-4 mb-2'>밀리언 페이지</h1>
			<div className='overflow-hidden rounded-lg'>
				<div className='flex gap-2 group'>
					<section className='flex gap-2 animate-slide group-hover:pause'>
						{novelDatas.map((novel, i) => (
							<Link
								key={novel.title + '-' + i}
								href={`/a/${novel.author}/${novel.id}`}
								className='flex flex-col gap-2'
							>
								<Image
									className='object-cover min-w-[90px]'
									alt='book cover image'
									height={120}
									radius='sm'
									src={uris[i]}
									isZoomed
								/>
								<Tooltip showArrow content={<p>{novel.title}</p>}>
									<small className='w-[90px] text-xs text-nowrap overflow-hidden text-ellipsis'>
										{novel.title}
									</small>
								</Tooltip>
								<div className='flex gap-1'>
									{novel.about.category.map((n) => (
										<small key={n} className='text-[10px] text-slate-600'>
											{n}
										</small>
									))}
								</div>
							</Link>
						))}
					</section>
					<section className='flex gap-2 animate-slide group-hover:pause'>
						{novelDatas.map((novel, i) => (
							<Link
								key={novel.title + '-' + i}
								href={`/a/${novel.author}/${novel.id}`}
								className='flex flex-col gap-2'
							>
								<Image
									className='object-cover min-w-[90px]'
									alt='book cover image'
									height={120}
									radius='sm'
									src={uris[i]}
									isZoomed
								/>
								<small className='w-[90px] text-xs text-nowrap overflow-hidden text-ellipsis'>
									{novel.title}
								</small>
								<div className='flex gap-1'>
									{novel.about.category.map((n) => (
										<small key={n} className='text-[10px] text-slate-600'>
											{n}
										</small>
									))}
								</div>
							</Link>
						))}
					</section>
				</div>
			</div>
		</div>
	);
}

async function fetchNovelDatas(): Promise<NovelSample[]> {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).slice(0, 8);
}
