import { Image } from '@heroui/react';
import Link from 'next/link';

const novels = [
	'/cover_thumbnails/novel_cover_thumbnail_8.png',
	'/cover_thumbnails/novel_cover_thumbnail_9.png',
	'/cover_thumbnails/novel_cover_thumbnail_10.png',
	'/cover_thumbnails/novel_cover_thumbnail_11.png',
	'/cover_thumbnails/novel_cover_thumbnail_12.png',
	'/cover_thumbnails/novel_cover_thumbnail_13.png',
];

export default function RecentTop6Novels() {
	return (
		<div className='grid grid-cols-6 gap-2'>
			{novels.map((novel) => (
				<Link key={novel} href={''}>
					<Image
						className='object-cover'
						alt='book cover image'
						height={230}
						radius='sm'
						src={novel}
						isZoomed
					/>
				</Link>
			))}
		</div>
	);
}
