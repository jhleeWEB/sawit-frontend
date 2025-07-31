'use client';

import useNovelSamples, { NovelSample } from '@/hooks/useNovelSamples';
import NovelCard from '../a/[author]/_components/NovelCard';
import { Card, CardBody } from '@heroui/react';

type RankingType = 'topView' | 'topFree' | 'topStar';

interface Props {
	rankingType: RankingType;
}

const max = 10;

const getTopView = (publishedNovels: NovelSample[]) => {
	const top10 = publishedNovels
		.sort((a, b) => b.stats.views - a.stats.views)
		.slice(0, max);
	return top10;
};
const getTopFree = (publishedNovels: NovelSample[]) => {
	const top10 = publishedNovels
		.sort((a, b) => b.stats.views - a.stats.views)
		.filter((n) => n.pricing.is_free)
		.slice(0, max);
	return top10;
};
const getTopStar = (publishedNovels: NovelSample[]) => {
	const top10 = publishedNovels
		.sort((a, b) => b.stats.stars - a.stats.stars)
		.slice(0, max);
	return top10;
};
const algorithms = {
	topView: getTopView,
	topFree: getTopFree,
	topStar: getTopStar,
};
const titles = {
	topView: 'TOP 10 랭킹',
	topFree: 'TOP 10 무료 랭킹',
	topStar: 'TOP 10 좋아요 랭킹',
};

export default function RankingCard({ rankingType }: Props) {
	const { publishedNovels } = useNovelSamples();
	const top10 = algorithms[rankingType](publishedNovels);
	return (
		<Card title={titles[rankingType]}>
			<CardBody>
				<div className='flex gap-4'>
					{top10.map((novel) => (
						<NovelCard key={novel.author + novel.title} novel={novel} />
					))}
				</div>
			</CardBody>
		</Card>
	);
}
