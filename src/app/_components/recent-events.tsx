'use client';
import { Button, Link } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const items = [1, 2, 3, 4, 5, 6, 7];
const TRANSITION = 'transform 500ms ease-in-out';

export default function RecentEvents() {
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
		}, 500);
	};

	useEffect(() => {
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			next();
		}, 5000);
		return () => clearInterval(interval);
	}, [next]);

	return (
		<div
			ref={wrappeRef}
			className='relative flex w-full overflow-hidden scrollbar-hide rounded-lg gap-2'
		>
			<Button
				isIconOnly
				variant='flat'
				className='absolute z-10 top-[calc(200px-24px)] left-[38px] rounded-full opacity-70 bg-slate-950'
				size='lg'
				onPress={prev}
			>
				<FaChevronLeft size={24} color='white' />
			</Button>
			<Button
				isIconOnly
				variant='flat'
				className='absolute z-10 top-[calc(200px-24px)] right-[38px] rounded-full opacity-70 bg-slate-950'
				size='lg'
				onPress={next}
			>
				<FaChevronRight size={24} color='white' />
			</Button>
			{stitchedItems.map((n, i) => {
				return (
					<Link
						key={n + '_' + i}
						className={` left-[calc(160px)]`}
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
							transition: `${transition}`,
						}}
					>
						<div
							className={`flex justify-center items-center rounded-lg h-[400px] min-w-[400px] bg-slate-${
								i + 1
							}00`}
						>
							<h1 className='text-[200px]'>{n}</h1>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
