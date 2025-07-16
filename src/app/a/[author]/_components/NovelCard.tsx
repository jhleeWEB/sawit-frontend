import Icon from '@/components/Icon';

import { NovelSample } from '@/hooks/useNovelSamples';
import { Chip, Image, Skeleton } from '@heroui/react';

interface Props {
	novel: NovelSample;
}

export default function NovelCard({ novel }: Props) {
	const { stats, pricing, about, content } = novel;
	return (
		<div className='relative flex flex-wrap w-40 mr-4 mb-4'>
			<Chip
				className='absolute z-50 right-2 top-2 font-bold'
				color='success'
				size='sm'
			>
				NEW
			</Chip>
			<Image
				alt='book cover image'
				height={240}
				radius='sm'
				src='/sample2.png'
			/>
			{about.category.map((n) => (
				<small key={novel.id + n} className='mr-1'>
					{n}
				</small>
			))}
			<h4 className='w-full truncate font-bold'>{novel.title}</h4>
			<small>{novel.author}</small>
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
