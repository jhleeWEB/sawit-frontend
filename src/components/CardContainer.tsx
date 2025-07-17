import { Card, CardBody, CardHeader } from '@heroui/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	title?: string;
}

export default function CardContainer({ title, children }: Props) {
	return (
		<Card className='p-2'>
			{title && <CardHeader>{title}</CardHeader>}
			<CardBody>{children}</CardBody>
		</Card>
	);
}
