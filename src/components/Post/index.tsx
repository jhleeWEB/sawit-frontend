import { Card, CardHeader, Divider } from '@heroui/react';
import Body from './Body';
import Footer from './Footer';
import { ReactRef } from '@heroui/react-utils';

interface Props {
	ref?: ReactRef<HTMLDivElement | null>;
	id?: number | string;
	title: string;
}
export default function Post({ ref, title }: Props) {
	return (
		<Card ref={ref} className='mb-2'>
			<CardHeader className='flex'>{title}</CardHeader>
			<Divider />
			<Body />
			<Divider />
			<Footer />
		</Card>
	);
}
