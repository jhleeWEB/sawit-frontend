import { CardBody, Image } from '@heroui/react';

export default function Body() {
	return (
		<CardBody>
			<Image
				src='/sample2.png'
				classNames={{ wrapper: '!max-w-full' }}
				loading='lazy'
				disableSkeleton={false}
			/>
		</CardBody>
	);
}
