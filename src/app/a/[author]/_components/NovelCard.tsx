import StarRating from '@/app/a/[author]/_components/star-rating';

import { NovelSample } from '@/hooks/useNovelSamples';
import { Card, CardBody, Chip, Image } from '@heroui/react';
import { useRouter } from 'next/navigation';
import ViewCount from './view-count';

interface Props {
	novel: NovelSample;
}

export default function NovelCard({ novel }: Props) {
	const { stats, about } = novel;
	const router = useRouter();
	const randomNumber = Math.floor(Math.random() * (25 - 1) + 1);

	const onClickAuthor = () => {
		router.push(`/a/${novel.author}`);
	};

	const onClickNovel = () => {
		router.push(`/a/${novel.author}/${novel.id}`);
	};

	return (
		<Card className='relative flex flex-wrap w-40 mb-4'>
			<CardBody>
				<Chip
					className='absolute z-50 right-2 top-2 font-bold'
					color='success'
					size='sm'
				>
					NEW
				</Chip>
				<Image
					className='cursor-pointer mb-2'
					alt='book cover image'
					width={160}
					radius='sm'
					src={`/cover_thumbnails/novel_cover_thumbnail_${randomNumber}.png`}
					onClick={onClickNovel}
				/>
				<div className='flex'>
					{about.category.map((n) => (
						<small key={novel.id + n} className='mr-1'>
							{n}
						</small>
					))}
				</div>
				<h4
					className='w-full truncate font-bold cursor-pointer'
					onClick={onClickNovel}
				>
					{novel.title}
				</h4>
				<small className='cursor-pointer' onClick={onClickAuthor}>
					{novel.author}
				</small>
				<div className='flex w-full justify-between'>
					<StarRating ratings={stats.stars} />
					<ViewCount views={stats.views} />
				</div>
			</CardBody>
		</Card>
	);
}
