'use client';
import { Button, Chip, Image, Spinner } from '@heroui/react';
import Icon from '../../../../components/Icon';
import useProfileSamples from '@/hooks/useProfileSamples';
import CardContainer from '@/components/CardContainer';

interface Props {
	author: string;
}

export default function ProfileCard({ author }: Props) {
	const { profileInfo } = useProfileSamples(author);

	if (!profileInfo) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	return (
		<CardContainer>
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
							<h4 className='font-bold text-large'>{profileInfo.author}</h4>
							<small className='text-default-500 text-ellipsis'>
								{profileInfo.description}
							</small>
						</div>
						<Button isIconOnly color='danger' variant='solid'>
							<Icon icon='Star' size={20} />
						</Button>
					</div>
					<div className='flex gap-2'>
						{profileInfo.achievements.map((achievement) => (
							<Chip key={profileInfo.author + achievement}>{achievement}</Chip>
						))}
					</div>
				</div>
			</div>
		</CardContainer>
	);
}
