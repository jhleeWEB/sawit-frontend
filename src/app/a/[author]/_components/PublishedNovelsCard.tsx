'use client';
import useNovelSamples from '@/hooks/useNovelSamples.ts';
import { Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import NovelCard from './NovelCard';

interface Props {
	author: string;
}

export default function PublishedNovelsCard({ author }: Props) {
	const { isLoading, publishedNovels } = useNovelSamples(author);
	return (
		<Card className='p-2'>
			<CardHeader>작품</CardHeader>
			<CardBody>
				<div className='flex flex-wrap'>
					{isLoading && <Spinner />}
					{publishedNovels.map((novel) => (
						<NovelCard key={novel.about.description} novel={novel} />
					))}
				</div>
			</CardBody>
		</Card>
	);
}
