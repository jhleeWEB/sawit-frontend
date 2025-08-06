import { Image } from '@heroui/react';
import Link from 'next/link';
import { NovelSample } from '../a/[author]/page';

const novelImages = [
	'/cover_thumbnails/novel_cover_thumbnail_8.png',
	'/cover_thumbnails/novel_cover_thumbnail_9.png',
	'/cover_thumbnails/novel_cover_thumbnail_10.png',
	'/cover_thumbnails/novel_cover_thumbnail_11.png',
	'/cover_thumbnails/novel_cover_thumbnail_12.png',
	'/cover_thumbnails/novel_cover_thumbnail_13.png',
];

export default async function RecentTop6Novels() {
	const novelsData = await fetchNovelData();

	return (
		<div className='grid grid-cols-6 gap-2'>
			{novelsData.map((novel, i) => (
				<Link
					key={novel.id + '-' + novel.title}
					href={`/a/${novel.author}/${novel.id}`}
				>
					<Image
						className='object-cover'
						alt='book cover image'
						height={230}
						radius='sm'
						src={novelImages[i]}
						isZoomed
					/>
				</Link>
			))}
		</div>
	);
}

async function fetchNovelData(): Promise<NovelSample[]> {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).slice(0, 6);
}
