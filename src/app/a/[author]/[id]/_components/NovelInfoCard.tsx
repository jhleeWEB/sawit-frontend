'use client';
import CardContainer from '@/components/CardContainer';
import Icon from '@/components/Icon';
import { NovelSample } from '@/hooks/useNovelSamples';
import { Chip, Image } from '@heroui/react';

interface Props {
	novel?: NovelSample;
}

export default function NovelInfoCard({ novel }: Props) {
	if (!novel) {
		return;
	}

	return (
		<CardContainer>
			<div className='grid grid-cols-4 gap-4 min-w-12'>
				<Icon
					icon='Bookmark'
					fill='none'
					className='absolute right-0 top-0 z-50'
				/>
				<div className='relative col-span-1'>
					<Image
						alt='Card background'
						className='object-cover rounded-xl'
						src='https://heroui.com/images/hero-card-complete.jpeg'
						height={280}
						isZoomed
					/>

					<Icon
						className='absolute left-2 top-2 z-50'
						icon='Star'
						fill='none'
						color='#ffde21'
					/>
				</div>
				<div className='flex flex-col justify-between col-span-3'>
					<div>
						<small>{new Date(novel?.created_at).toDateString()}</small>
						<div className='flex gap-x-1'>
							{novel.about.category.map((n) => (
								<Chip key={novel.title + n}>{n}</Chip>
							))}
						</div>
						<h3 className='text-xl font-bold'>{novel?.title}</h3>
						<small>저자: </small>
						<small>{novel?.author}</small>
						<h4>{novel.about.description}</h4>
					</div>
					<div className='row-span-3'>
						<div className='flex flex-wrap gap-2'>
							<div className='bg-slate-200 px-2 rounded-lg'>
								<label>별점: </label>
								<span>{novel.stats.stars.toLocaleString()}</span>
							</div>
							<div className='bg-slate-200 px-2 rounded-lg'>
								<label>뷰: </label>
								<span>{novel.stats.views.toLocaleString()}</span>
							</div>
							<div className='bg-slate-200 px-2 rounded-lg'>
								<label>추천: </label>
								<span>{novel.stats.recommends.toLocaleString()}</span>
							</div>
							<div className='bg-slate-200 px-2 rounded-lg'>
								<label>북마크: </label>
								<span>{novel.stats.bookmarks.toLocaleString()}</span>
							</div>
							<div className='bg-slate-200 px-2 rounded-lg'>
								<label>글자수: </label>
								<span>{novel.stats.word_count.toLocaleString()}</span>
							</div>
							<div className='bg-slate-200 px-2 rounded-lg'>
								<label>회차: </label>
								<span>{novel.stats.series_count.toLocaleString()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CardContainer>
	);
}
