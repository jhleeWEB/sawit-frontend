import { useEffect, useState } from 'react';

export interface NovelSample {
	id: number;
	author: string;
	title: string;
	created_at: Date;
	latest_update: Date;
	page_info: {
		cover_img: string;
		tags: string[];
	};
	stats: {
		stars: number;
		views: number;
		recommends: number;
		bookmarks: number;
		word_count: number;
		series_count: number;
	};
	pricing: {
		is_free: true;
		price_per_series: number;
		total_price: number;
	};
	about: {
		category: string[];
		description: string;
		status: string;
		rating: number;
	};
	content: {
		total_page: number;
		pages: [];
	};
}

export default function useNovelSamples(author: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [publishedNovels, setPublishedNovels] = useState<NovelSample[]>([]);
	useEffect(() => {
		setIsLoading(true);
		(async function fetchSample() {
			const arr = await import('/public/samples/korean_sample_novels_100.json');
			const list = Array.from(arr) as NovelSample[];
			const novels = list.filter((n) => n.author === author);
			setPublishedNovels(novels);
			setIsLoading(false);
		})();
	}, [author]);

	return { isLoading, publishedNovels };
}
