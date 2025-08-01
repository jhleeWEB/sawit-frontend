import { formatToKoreanUnits } from '@/utils/format-to-korean-unit';
import { Chip, Image } from '@heroui/react';
import { IoEyeOutline, IoStarOutline } from 'react-icons/io5';
import { achevementStyles } from './_const/achievement-styles';

export default async function Author({
	params,
}: {
	params: Promise<{ author: string }>;
}) {
	let { author } = await params;
	author = decodeURIComponent(author);
	const authorProfileData = fetchAuthorProfileSamples(author);
	const novelData = fetchNovelSample(author);
	const [authorProfile, publishedNovels] = await Promise.all([
		authorProfileData,
		novelData,
	]);

	if (!authorProfile || !publishedNovels) {
		return;
	}

	const totalViews = publishedNovels.reduce((a, b) => (a += b.stats.views), 0);
	const avgStar =
		Math.round(
			(publishedNovels.reduce((a, b) => (a += b.stats.stars), 0) /
				publishedNovels.length) *
				10
		) / 10;

	return (
		<section className='grid grid-cols-3 gap-2 mt-8 h-full'>
			<div className='rounded-xl bg-slate-100 col-span-1 bg-[url(https://heroui.com/images/hero-card-complete.jpeg)] bg-no-repeat '>
				<div className='flex flex-col items-center p-4 rounded-xl w-full h-full bg-white/70 backdrop-blur-lg'>
					<Image
						alt='Card background'
						className='object-cover rounded-xl mt-4'
						src='https://heroui.com/images/hero-card-complete.jpeg'
						width={160}
						height={240}
						isZoomed
					/>
					<div className='flex flex-col items-center mt-16 gap-2'>
						<div>
							<h4 className='font-bold text-2xl text-center'>
								{authorProfile.author}
							</h4>
							<small className='text-default-500 text-ellipsis text-center'>
								{authorProfile.description}
							</small>
							<div className='flex justify-center gap-2'>
								<div className='flex items-center'>
									<IoEyeOutline stroke='#6b7280' />
									<small className='text-gray-500 text-xs text-ellipsis text-center ml-1'>
										{formatToKoreanUnits(totalViews)}
									</small>
								</div>
								<div className='flex items-center'>
									<IoStarOutline stroke='#6b7280' />
									<small className='text-gray-500 text-xs text-ellipsis text-center ml-1'>
										{avgStar}
									</small>
								</div>
							</div>
						</div>
						<div className='flex gap-2 mt-8'>
							{authorProfile.achievements.map((achievement, i) => (
								<Chip
									size='sm'
									className={`${achevementStyles[i]} shadow-md`}
									key={authorProfile.author + achievement}
								>
									<small className='text-white font-bold'>{achievement}</small>
								</Chip>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='col-span-2 rounded-xl bg-slate-100 p-8'>
				<ul className='flex flex-col gap-2'>
					{publishedNovels.map((novel, i) => {
						const randomNumber = Math.floor(Math.random() * (25 - 1) + 1);
						return (
							<li
								key={novel.title + i}
								className='flex w-full gap-2 hover:cursor-pointer hover:bg-slate-200'
							>
								<Image
									className='object-cover'
									alt='book cover image'
									width={56}
									height={86}
									radius='sm'
									src={`/cover_thumbnails/novel_cover_thumbnail_${randomNumber}.png`}
									isZoomed
								/>
								<div>
									<h4 className='w-full truncate font-bold'>{novel.title}</h4>
									<div className='flex'>
										{novel.about.category.map((n) => (
											<small key={novel.id + n} className='mr-1'>
												{n}
											</small>
										))}
									</div>
									<div className='flex w-full gap-2'>
										<div className='flex items-center'>
											<IoStarOutline />
											<small className='ml-1 font-bold align-middle text-red-400'>
												{novel.stats.stars}
											</small>
										</div>
										<div className='flex items-center'>
											<IoEyeOutline />
											<small className='align-middle ml-1'>
												{novel.stats.views.toLocaleString()}
											</small>
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}

async function fetchAuthorProfileSamples(author: string) {
	const samples = await import(
		'/public/samples/author_profiles_with_books.json'
	);
	const profile = (Array.from(samples) as AuthorProfileSamples[]).find(
		(n) => n.author === author
	);
	return profile;
}
export interface AuthorProfileSamples {
	author: string;
	avatar: string;
	background_img: string;
	published_novels: [];
	description: string;
	achievements: string[];
}

async function fetchNovelSample(author: string) {
	const arr = await import('/public/samples/korean_sample_novels_100.json');
	const list = Array.from(arr) as NovelSample[];
	if (author) {
		const novels = list.filter((n) => n.author === author);
		return novels;
	}
	return [];
}

export interface NovelSample {
	id: string;
	author: string;
	title: string;
	created_at: Date;
	latest_update: Date;
	page_info: {
		cover_img: string;
		tags: string[];
	};
	stats: {
		stars: number;
		views: number;
		recommends: number;
		bookmarks: number;
		word_count: number;
		series_count: number;
	};
	pricing: {
		is_free: true;
		price_per_series: number;
		total_price: number;
	};
	about: {
		category: string[];
		description: string;
		status: string;
		rating: number;
	};
	content: {
		total_page: number;
		pages: [];
	};
}
