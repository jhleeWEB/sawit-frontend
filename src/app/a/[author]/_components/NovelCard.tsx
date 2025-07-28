import Icon from '@/components/Icon';

import { NovelSample } from '@/hooks/useNovelSamples';
import { Chip, Image } from '@heroui/react';
import { useRouter } from 'next/navigation';

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
		<div className='relative flex flex-wrap w-40 mb-4'>
			<Chip
				className='absolute z-50 right-2 top-2 font-bold'
				color='success'
				size='sm'
			>
				NEW
			</Chip>
			<Image
				className='cursor-pointer'
				alt='book cover image'
				height={240}
				radius='sm'
				src={`/cover_thumbnails/novel_cover_thumbnail_${randomNumber}.png`}
				onClick={onClickNovel}
			/>
			{about.category.map((n) => (
				<small key={novel.id + n} className='mr-1'>
					{n}
				</small>
			))}
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
				<div className='flex items-center'>
					<Icon fill='none' icon='Star' size={14} />
					<small>{about.rating.toLocaleString()}</small>
				</div>
				<div className='flex items-center'>
					<Icon fill='none' icon='Eye' size={14} />
					<small>{stats.views.toLocaleString()}</small>
				</div>
			</div>
		</div>
	);
}
