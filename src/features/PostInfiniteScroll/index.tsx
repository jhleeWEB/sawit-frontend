'use client';

import { Spinner } from '@heroui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Props = {
	threadName: string;
};

export default function PostInfiniteScroll({ threadName }: Props) {
	const observer = useRef<null | IntersectionObserver>(null);

	const [posts, setPosts] = useState<[] | { index: number }[]>([]);
	const memoizedPosts = useMemo(() => {
		return [...posts];
	}, [posts]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setPage((prev) => prev + 1);
					}
				},
				{ threshold: 1.0 }
			);
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	if (!data || isLoading) return;
	return (
		<div className='col-span-2 bg-slate-300 p-4'>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14].map((n, i) =>
				i + 1 === [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14].length ? (
					<div key={`${n}_${i}`}>sdfsdfdsf</div>
				) : (
					<div key={`${n}_${i}`}>asdfasdf</div>
				)
			)}
			{isLoading && <Spinner />}
		</div>
	);
}
