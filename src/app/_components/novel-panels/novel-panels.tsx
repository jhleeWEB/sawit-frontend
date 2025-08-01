import { Image } from '@heroui/react';
import Link from 'next/link';

interface Props {
	items: string[];
	title: string;
}
export default function NovelPanels({ title, items }: Props) {
	return (
		<section>
			<div className='text-lg font-bold mt-4 mb-2'>{title}</div>
			<div className='grid grid-cols-6 gap-2'>
				{items.map((n) => (
					<Link href='' key={n} className='relative'>
						<Image
							className='object-cover aspect-[1/2]'
							alt='book cover image'
							radius='sm'
							src={n}
							isZoomed
						/>
						<div className='absolute bottom-0 z-10 h-1/2 w-full flex flex-col rounded-b-lg justify-end pb-2 bg-gradient-to-t from-gray-700 to-transparent'>
							<p className='text-center font-bold text-white'>제목은 여기에</p>
							<small className='text-center text-slate-100'>조희수</small>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
