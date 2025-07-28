'use client';

import Icon from '@/components/Icon';
import { Button } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function PageController() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const volumnNumber = searchParams.get('volumnNo');

	const createQueryString = useCallback(
		(name: string, value: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value.toString());
			console.log(params);
			return params.toString();
		},
		[searchParams]
	);

	const onClickPrevVolumn = () => {
		if (volumnNumber) {
			router.push(
				pathname + '?' + createQueryString('volumnNo', Number(volumnNumber) - 1)
			);
		}
	};
	const onClickNextVolumn = () => {
		if (volumnNumber) {
			router.push(
				pathname + '?' + createQueryString('volumnNo', Number(volumnNumber) + 1)
			);
		}
	};
	const onClickGoToList = () => {
		router.push(pathname.replace('volumn', ''));
	};

	if (!volumnNumber) {
		return;
	}

	return (
		<div className='fixed bottom-10 right-48 flex p-4 gap-2'>
			<Button
				isIconOnly
				disabled={Number(volumnNumber) === 0}
				aria-label='back'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
				onPress={onClickPrevVolumn}
			>
				<Icon icon='Back' fill='none' />
			</Button>

			<Button
				isIconOnly
				aria-label='forward'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
				onPress={onClickNextVolumn}
			>
				<Icon icon='Forward' fill='none' />
			</Button>

			<Button
				isIconOnly
				aria-label='forward'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
				onPress={onClickGoToList}
			>
				<Icon icon='NumberList' fill='none' />
			</Button>

			<Button
				isIconOnly
				aria-label='forward'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
			>
				<Icon icon='VerticalEllipsis' fill='none' />
			</Button>
		</div>
	);
}
