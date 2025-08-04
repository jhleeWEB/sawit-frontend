import { Image } from '@heroui/react';

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

export default function MillionPagesNovels() {
	return (
		<div>
			<h1 className='font-bold text-lg mt-4 mb-2'>밀리언 페이지</h1>
			<div className='overflow-hidden rounded-lg'>
				<div className='flex gap-2 group'>
					<section className='flex gap-2 animate-slide group-hover:pause'>
						{uris.map((n, i) => (
							<div key={n + '-' + i} className='flex flex-col gap-2'>
								<Image
									className='object-cover min-w-[90px]'
									alt='book cover image'
									height={120}
									radius='sm'
									src={n}
									isZoomed
								/>
								<small className='text-xs'>제목 여기에 넣기</small>
								<small className='text-[10px] text-slate-600'>
									장르는 여기에
								</small>
							</div>
						))}
					</section>
					<section
						aria-hidden
						className='flex gap-2 animate-slide group-hover:pause'
					>
						{uris.map((n, i) => (
							<div key={n + '-' + i}>
								<Image
									className='object-cover min-w-[90px]'
									alt='book cover image'
									width={90}
									height={120}
									radius='sm'
									src={n}
									isZoomed
								/>
								<small className='text-xs'>제목 여기에 넣기</small>
								<small className='text-[10px] text-slate-600'>
									장르는 여기에
								</small>
							</div>
						))}
					</section>
				</div>
			</div>
		</div>
	);
}
