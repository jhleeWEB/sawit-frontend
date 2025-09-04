'use client';
import { Image, Spinner } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LoginConfirmation() {
	const [isLoading, setIsLoading] = useState(true);
	const { data, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			setIsLoading(false);
		}
	}, [status]);

	return (
		<div>
			{isLoading && <Spinner />}
			{!isLoading && data && (
				<div>
					<p>{data.user.name}</p>
					<p>{data.user.email}</p>
					<Image alt='avatar' src={data.user.image!} />
				</div>
			)}
		</div>
	);
}
