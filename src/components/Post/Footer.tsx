import { CardFooter, Chip } from '@heroui/react';

export default function Footer() {
	return (
		<CardFooter className='gap-2'>
			<Chip>likes</Chip>
			<Chip>comments</Chip>
			<Chip>share</Chip>
		</CardFooter>
	);
}
