import { Image } from '@heroui/react';
import { IoAddOutline } from 'react-icons/io5';
import EditorWrapper from './_components/editor';

export default async function Publish({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{
		title: string;
		description: string;
		author: string;
		cover_image: string;
	}>;
}) {
	const { id } = await params;
	const { title, description, author, cover_image } = await searchParams;
	console.log(title, description, author, cover_image);
	return (
		<section className='w-full'>
			<div className='w-full rounded-xl bg-slate-100 bg-top bg-[url(https://heroui.com/images/hero-card-complete.jpeg)] bg-no-repeat'>
				<div className='flex w-full h-full gap-2 p-4 rounded-xl bg-white/70 backdrop-blur-md'>
					{cover_image ? (
						<div className='relative'>
							<Image
								alt='Card background'
								className='object-cover rounded-xl'
								src='https://heroui.com/images/hero-card-complete.jpeg'
								height={140}
								width={80}
								isZoomed
							/>
						</div>
					) : (
						<div className='min-h-[140px] min-w-[80px] rounded-xl border flex flex-col justify-center items-center text-gray-200 cursor-pointer hover:border-teal-200 hover:text-teal-200'>
							<IoAddOutline size={28} />
						</div>
					)}
					<div className='flex flex-col justify-between'>
						<div>
							<small>234234234</small>
						</div>
						<div>
							<h3 className='text-xl font-bold'>작품 제목</h3>
							<small>장르</small>
							<h4>설명</h4>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full rounded-xl bg-slate-100'>
				<EditorWrapper />
			</div>
		</section>
	);
}
