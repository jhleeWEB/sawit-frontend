'use client';
import Post from '@/components/Post';
import { Spinner } from '@heroui/react';
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchThreadPosts } from './apis';
import { useQuery } from '@tanstack/react-query';

type Props = {
	threadName: string;
};

export default function PostInfiniteScroll({ threadName }: Props) {
	// const observer = useRef<null | IntersectionObserver>(null);
	const { data, isLoading } = useQuery({
		queryKey: [threadName, 'posts'],
		queryFn: () => fetchThreadPosts(threadName),
	});
	// const [posts, setPosts] = useState<[] | { index: number }[]>([]);
	// const memoizedPosts = useMemo(() => {
	// 	return [...posts];
	// }, [posts]);
	// const [page, setPage] = useState(0);
	// const [hasMore, setHasMore] = useState(true);

	// useEffect(() => {}, [page]);

	// const lastPostRef = useCallback(
	// 	(node: HTMLDivElement) => {
	// 		if (isLoading) return;
	// 		if (observer.current) observer.current.disconnect();
	// 		observer.current = new IntersectionObserver(
	// 			(entries) => {
	// 				if (entries[0].isIntersecting && hasMore) {
	// 					setPage((prev) => prev + 1);
	// 				}
	// 			},
	// 			{ threshold: 1.0 }
	// 		);
	// 		if (node) observer.current.observe(node);
	// 	},
	// 	[isLoading, hasMore]
	// );

	if (!data || isLoading) return;
	return (
		<div className='col-span-2 bg-slate-300 p-4'>
			{data.map((n, i) =>
				i + 1 === data.length ? (
					<Post key={i} title={n.title} />
				) : (
					<Post key={i} title={n.title} />
				)
			)}
			{isLoading && <Spinner />}
		</div>
	);
}
