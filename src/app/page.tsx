import RankingCard from './_components/RankingCard';

export default function Home() {
	return (
		<section className='p-4'>
			<RankingCard rankingType='topView' />
			<RankingCard rankingType='topFree' />
			<RankingCard rankingType='topStar' />
		</section>
	);
}
