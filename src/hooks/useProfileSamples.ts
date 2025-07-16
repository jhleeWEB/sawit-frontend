import { useEffect, useState } from 'react';

export interface AuthorProfileSamples {
	author: string;
	avatar: string;
	background_img: string;
	published_novels: [];
	description: string;
	achievements: string[];
}

export default function useProfileSamples(author: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [profileInfo, setProfileInfo] = useState<AuthorProfileSamples>();

	useEffect(() => {
		setIsLoading(true);
		(async function fetchAuthorProfileSamples() {
			const samples = await import(
				'/public/samples/author_profiles_with_books.json'
			);
			const profile = (Array.from(samples) as AuthorProfileSamples[]).find(
				(n) => n.author === author
			);
			setProfileInfo(profile);
			setIsLoading(false);
		})();
	}, [author]);

	return { isLoading, profileInfo };
}
