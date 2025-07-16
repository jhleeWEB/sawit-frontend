'use client';
import { Button, Card, CardBody, Chip, Image } from '@heroui/react';
import Icon from '../../../../components/Icon';

type Author = {
	author: string;
	avatar: string;
	background_img: string;
	published_books: string[];
	description: string;
	achievements: string[];
};
interface Profile {
	profile: Author;
}

export default function ProfileCard({ profile }: Profile) {
	return (
		<Card className='p-2'>
			<CardBody>
				<div className='grid grid-cols-6 gap-4 min-w-12'>
					<div className='col-span-2'>
						<Image
							alt='Card background'
							className='object-cover rounded-xl'
							src='https://heroui.com/images/hero-card-complete.jpeg'
							width={270}
							isZoomed
						/>
					</div>
					<div className='flex flex-col justify-between col-span-4'>
						<div className='flex justify-between'>
							<div>
								<h4 className='font-bold text-large'>{profile.author}</h4>
								<small className='text-default-500 text-ellipsis'>
									{profile.description}
								</small>
							</div>
							<Button isIconOnly color='danger' variant='solid'>
								<Icon icon='Star' size={20} />
							</Button>
						</div>
						<div className='flex gap-2'>
							<Chip>hell</Chip>
							<Chip>hell</Chip>
							<Chip>hell</Chip>
							<Chip>hell</Chip>
							<Chip>hell</Chip>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
