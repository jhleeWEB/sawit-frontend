'use client';

import CardContainer from '@/components/CardContainer';
import useNovelSamples, { NovelSample } from '@/hooks/useNovelSamples';
import NovelCard from '../a/[author]/_components/NovelCard';

type RankingType = 'topView' | 'topFree' | 'topStar';

interface Props {
	rankingType: RankingType;
}

const getTopView = (publishedNovels: NovelSample[]) => {
	const top5 = publishedNovels
		.sort((a, b) => b.stats.views - a.stats.views)
		.slice(0, 5);
	return top5;
};
const getTopFree = (publishedNovels: NovelSample[]) => {
	const top5 = publishedNovels
		.sort((a, b) => b.stats.views - a.stats.views)
		.filter((n) => n.pricing.is_free)
		.slice(0, 5);
	return top5;
};
const getTopStar = (publishedNovels: NovelSample[]) => {
	const top5 = publishedNovels
		.sort((a, b) => b.stats.stars - a.stats.stars)
		.slice(0, 5);
	return top5;
};
const algorithms = {
	topView: getTopView,
	topFree: getTopFree,
	topStar: getTopStar,
};
const titles = {
	topView: 'TOP 5 랭킹',
	topFree: 'TOP 5 무료 랭킹',
	topStar: 'TOP 5 좋아요 랭킹',
};

export default function RankingCard({ rankingType }: Props) {
	const { publishedNovels } = useNovelSamples();
	const top5 = algorithms[rankingType](publishedNovels);
	return (
		<CardContainer title={titles[rankingType]}>
			<div className='flex flex-wrap gap-4'>
				{top5.map((novel) => (
					<NovelCard key={novel.author + novel.title} novel={novel} />
				))}
			</div>
		</CardContainer>
	);
}
