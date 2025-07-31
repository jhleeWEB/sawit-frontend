'use client';

import Conveyor from '@/components/conveyor/conveyor';
import useNovelSamples, { NovelSample } from '@/hooks/useNovelSamples';

type RankingType = 'topView' | 'topFree' | 'topStar';

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

export default function BannerNewReleases() {
	const { publishedNovels } = useNovelSamples();
	const top10 = algorithms['topView'](publishedNovels);
	return <Conveyor />;
}
