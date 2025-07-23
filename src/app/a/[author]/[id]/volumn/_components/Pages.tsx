'use client';

import { Card, CardBody, CardFooter } from '@heroui/react';

interface Props {
	pages: string[];
}

export default function Pages({ pages }: Props) {
	return (
		<div>
			{pages.map((page, index) => (
				<Card
					className='min-h-[800px] max-w-[640px] mb-4 select-none'
					key={page}
				>
					<CardBody>
						<div className='my-auto mt-24 px-24 text-xl leading-10'>{page}</div>
					</CardBody>
					<CardFooter className='flex justify-end'>
						<div className='mr-8 mb-8 text-gray-700'>{index + 1} 쪽</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
