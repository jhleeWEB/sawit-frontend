import Icon from '@/components/Icon';
import { Button } from '@heroui/react';

export default function PageController() {
	return (
		<div className='fixed bottom-10 right-48 flex p-4 gap-2'>
			<Button
				isIconOnly
				aria-label='back'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
			>
				<Icon icon='Back' fill='none' />
			</Button>

			<Button
				isIconOnly
				aria-label='forward'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
			>
				<Icon icon='Forward' fill='none' />
			</Button>

			<Button
				isIconOnly
				aria-label='forward'
				variant='solid'
				className='rounded-full bg-white shadow-md shadow-slate-300'
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
