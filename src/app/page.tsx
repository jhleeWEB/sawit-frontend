import BannerNewReleases from './_components/banner-new-releases';
import CarouselRankings from './_components/carousel-rankings';

export default function Home() {
	return (
		<section className='w-full flex flex-col gap-2'>
			<CarouselRankings />
			<BannerNewReleases />
		</section>
	);
}
