'use client';
import useNovelSamples from '@/hooks/useNovelSamples.ts';
import { Spinner } from '@heroui/react';
import NovelCard from './NovelCard';
import CardContainer from '@/components/CardContainer';

interface Props {
	author: string;
}

export default function PublishedNovelsCard({ author }: Props) {
	const { isLoading, publishedNovels } = useNovelSamples(author);
	return (
		<CardContainer title='작품'>
			<div className='flex flex-wrap gap-4'>
				{isLoading && <Spinner />}
				{publishedNovels.map((novel) => (
					<NovelCard key={novel.about.description} novel={novel} />
				))}
			</div>
		</CardContainer>
	);
}
