'use client';
import http from '@/http';
import { Button, Spinner } from '@heroui/react';
import { useState } from 'react';

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);

	const onClickCreateThread = async () => {
		setIsLoading(true);
		try {
			const res = await http.get('thread/');
			setIsLoading(false);
		} catch {
			setIsLoading(false);
		}
	};

	return (
		<section>
			home
			{isLoading && <Spinner />}
			<Button onPress={onClickCreateThread}>create thread</Button>
		</section>
	);
}
