import { Chip } from '@heroui/react';

const menu = [
	'지금핫한',
	'실시간 랭킹',
	'최근신작',
	'완결추천',
	'여성인기',
	'19',
];
export type PageType = (typeof menu)[number];

export default function ChipShortcuts() {
	return (
		<div className='flex gap-2 my-8'>
			{menu.map((n, i) => (
				<Chip key={n + i} variant='bordered' className='border-1 py-4'>
					{n}
				</Chip>
			))}
		</div>
	);
}
