'use client';

import { Spinner } from '@heroui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Post from './post';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type Props = {
	threadName: string;
};

export default function InfiniteScroll({ threadName }: Props) {
	const observer = useRef<null | IntersectionObserver>(null);

	const [posts, setPosts] = useState<[] | { index: number }[]>([]);
	const memoizedPosts = useMemo(() => {
		return [...posts];
	}, [posts]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {}, [page]);

	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
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
		[, hasMore]
	);

	if (!data) return;
	return (
		<div className='w-full bg-slate-300 p-4'>
			{data.map((n, i) =>
				i + 1 === data.length ? <Post key={i} /> : <Post key={i} />
			)}
		</div>
	);
}
