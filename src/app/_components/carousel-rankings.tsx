'use client';
import { Button, Link } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function CarouselRankings() {
	const wrappeRef = useRef<HTMLDivElement>(null);
	const currentIndex = useState(0);
	const loadExtraEnd = useState(false);
	const loadExtraStart = useState(false);

	const next = useCallback(() => {}, [currentIndex]);
	const prev = useCallback(() => {}, [currentIndex]);

	useEffect(() => {
		if (wrappeRef.current) {
			wrappeRef.current.scrollTo({ left: 200, behavior: 'smooth' });
		}
	}, []);

	return (
		<div>
			<Button onPress={prev}>prev</Button>
			<Button onPress={next}>next</Button>
			<div
				ref={wrappeRef}
				className='snap-x snap-mandatory w-full overflow-auto scrollbar-hide flex gap-2'
			>
				<Link className='snap-center flex justify-center items-center h-[400px] min-w-[400px] bg-slate-300'>
					<h1 className='text-[200px]'>1</h1>
				</Link>
				<Link className='snap-center flex justify-center items-center h-[400px] min-w-[400px] bg-slate-400'>
					<h1 className='text-[200px]'>2</h1>
				</Link>
				<Link className='snap-center flex justify-center items-center h-[400px] min-w-[400px] bg-slate-500'>
					<h1 className='text-[200px]'>3</h1>
				</Link>
				<Link className='snap-center flex justify-center items-center h-[400px] min-w-[400px] bg-slate-600'>
					<h1 className='text-[200px]'>4</h1>
				</Link>
				<Link className='snap-center flex justify-center items-center h-[400px] min-w-[400px] bg-slate-700'>
					<h1 className='text-[200px]'>5</h1>
				</Link>
			</div>
		</div>
	);
}
