import { Image } from '@heroui/react';
import Link from 'next/link';
import { NovelSample } from '../../a/[author]/page';
import { IoEyeOutline } from 'react-icons/io5';
import { formatToKoreanUnits } from '@/lib/format-to-korean-unit';

interface Props {
	images: string[]; //temporary image src
	novels: NovelSample[];
	title: string;
}
export default function NovelPanels({ title, images, novels }: Props) {
	return (
		<section>
			<div className='text-lg font-bold mt-4 mb-2'>{title}</div>
			<div className='grid grid-cols-6 gap-2'>
				{novels.map((novel, i) => (
					<Link
						href={`/a/${novel.author}/${novel.id}`}
						key={novel.title}
						className='relative'
					>
						<Image
							className='object-cover aspect-[1/2]'
							alt='book cover image'
							radius='sm'
							src={images[i]}
							isZoomed
						/>
						<div className='absolute bottom-0 z-10 h-1/2 w-full flex flex-col rounded-b-lg justify-end pb-2 bg-gradient-to-t from-gray-700 to-transparent'>
							<p className='text-center font-bold text-white'>{novel.title}</p>
							<div className='flex gap-1 items-center justify-center  text-slate-100'>
								<IoEyeOutline />
								<small className='text-center'>
									{formatToKoreanUnits(novel.stats.views)}
								</small>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
