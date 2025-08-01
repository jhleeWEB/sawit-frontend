'use client';
import { Button, Link } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const items = [1, 2, 3, 4, 5, 6, 7];
const TRANSITION = 'transform 1s ease-in-out';

export default function CarouselEvents() {
	const timer = useRef<null | NodeJS.Timeout>(null);
	const wrappeRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(2);
	const [stitchedItems] = useState(() => {
		return [
			items[items.length - 2],
			items[items.length - 1],
			...items,
			items[0],
			items[1],
		];
	});
	const [transition, setTransition] = useState('');

	const next = useCallback(() => {
		const itemLength = items.length;
		const nextIndex = currentIndex + 1;
		setCurrentIndex(nextIndex);
		if (nextIndex === itemLength + 2) {
			reset(2);
		}
		setTransition(TRANSITION);
	}, [currentIndex]);

	const prev = useCallback(() => {
		const itemLength = items.length;
		const prevIndex = currentIndex - 1;
		setCurrentIndex(prevIndex);
		if (prevIndex === 1) {
			reset(itemLength + 1);
		}
		setTransition(TRANSITION);
	}, [currentIndex]);

	const reset = (index: number) => {
		timer.current = setTimeout(() => {
			setTransition('');
			setCurrentIndex(index);
		}, 1000);
	};

	useEffect(() => {
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, []);

	return (
		<div>
			<Button onPress={prev}>prev</Button>
			<Button onPress={next}>next</Button>
			<div
				ref={wrappeRef}
				className='w-full overflow-hidden scrollbar-hide flex'
			>
				{stitchedItems.map((n, i) => {
					return (
						<Link
							key={n + '_' + i}
							className={` left-[180px] p-1`}
							style={{
								transform: `translateX(-${currentIndex * 100}%)`,
								transition: `${transition}`,
							}}
						>
							<div
								className={`flex justify-center items-center h-[400px] min-w-[400px] bg-slate-${
									i + 1
								}00`}
							>
								<h1 className='text-[200px]'>{n}</h1>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
