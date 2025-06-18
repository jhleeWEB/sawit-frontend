'use client';

import { useEffect } from 'react';

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h1>Page not found!</h1>
		</div>
	);
}
