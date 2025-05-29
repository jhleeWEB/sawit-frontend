import { CardHeader, Chip } from '@heroui/react';

export default function Header() {
	return (
		<CardHeader className='p-0 flex justify-between'>
			<div>
				<small className='p-0 text-tiny uppercase font-bold'>Daily Mix</small>:
				<small className='text-default-500'>12 Tracks</small>
			</div>
			<Chip>...</Chip>
		</CardHeader>
	);
}
