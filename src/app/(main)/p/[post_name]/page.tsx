import { formatToKoreanUnits } from '@/utils/format-to-korean-unit';
import { Button, Chip, Image } from '@heroui/react';
import { IoAddOutline, IoEyeOutline, IoStarOutline } from 'react-icons/io5';
import { achevementStyles } from './_const/achievement-styles';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import http from '@/lib/axios/http';
import { authOptions } from '@/lib/auth/auth-options';
import InfiniteScroll from '@/features/infinite-scroll';

export default async function Author({
	params,
}: {
	params: Promise<{ post_name: string }>;
}) {
	let { post_name } = await params;
	const postName = decodeURIComponent(post_name);

	return (
		<section className='grid grid-cols-3 gap-2 mt-8 h-full w-full'>
			<div className='w-full h-full rounded-xl bg-slate-100 col-span-1'>
				<InfiniteScroll threadName='hello' />
			</div>
		</section>
	);
}
