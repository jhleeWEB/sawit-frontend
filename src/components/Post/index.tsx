import {
	Badge,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Divider,
	Image,
} from '@heroui/react';
import Header from './Header';

export default function Post() {
	return (
		<Card className='mb-2'>
			<CardHeader className='flex'>
				<Header />
			</CardHeader>
			<Divider />
			<CardBody>
				<Image
					src='/sample2.png'
					classNames={{ wrapper: '!max-w-full' }}
					loading='lazy'
				/>
			</CardBody>
			<CardFooter className='gap-2'>
				<Chip>likes</Chip>
				<Chip>comments</Chip>
				<Chip>share</Chip>
			</CardFooter>
		</Card>
	);
}
