import BannerNewReleases from './_components/banner-new-releases';
import CarouselEvents from './_components/carousel-events';
import ChipShortcuts from './_components/chips-shortcuts';

export default function Home() {
	return (
		<section className='w-full flex flex-col gap-2'>
			<ChipShortcuts />
			<CarouselEvents />
			<BannerNewReleases />
		</section>
	);
}
