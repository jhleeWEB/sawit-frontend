'use client';
import Post from '@/components/Post';
import { Spinner } from '@heroui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const data = Array(100)
	.fill(false)
	.map((_, i) => ({ index: i }));
const pageCount = 10;

export default function P() {
	const observer = useRef<null | IntersectionObserver>(null);
	const [posts, setPosts] = useState<[] | { index: number }[]>([]);
	const memoizedPosts = useMemo(() => {
		return [...posts];
	}, [posts]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		fetchPosts(page);
	}, [page]);

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

	const fetchPosts = (page: number) => {
		setIsLoading(true);
		setTimeout(() => {
			const res = data.slice(page * pageCount, page * pageCount + pageCount);
			if (res.length < pageCount) setHasMore(false);
			setPosts((prev) => [...prev, ...res]);
			setIsLoading(false);
		}, 3000);
	};

	return (
		<section className='h-full overflow-y-auto'>
			<div className='bg-slate-400 min-h-40'>title header</div>
			<div className='grid grid-cols-3'>
				<div className='col-span-2 bg-slate-300 p-4'>
					{posts.map((n, i) =>
						i + 1 === memoizedPosts.length ? (
							<Post ref={lastPostRef} key={i} id={n.index} />
						) : (
							<Post key={i} id={n.index} />
						)
					)}
					{isLoading && <Spinner />}
				</div>
			</div>
		</section>
	);
}
