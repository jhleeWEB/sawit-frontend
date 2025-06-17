import { Card, CardHeader, Divider } from '@heroui/react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { ReactRef } from '@heroui/react-utils';

interface Props {
	ref?: ReactRef<HTMLDivElement | null>;
	id?: number | string;
}
export default function Post({ id, ref }: Props) {
	return (
		<Card ref={ref} className='mb-2'>
			<CardHeader className='flex'>
				{id}
				<Header />
			</CardHeader>
			<Divider />
			<Body />
			<Divider />
			<Footer />
		</Card>
	);
}
