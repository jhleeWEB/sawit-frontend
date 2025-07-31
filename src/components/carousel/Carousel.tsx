import { Button } from '@heroui/react';
import {
	Children,
	PropsWithChildren,
	TouchEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface Props extends PropsWithChildren {
	visibleItemsCount?: number;
	isInfinite?: boolean;
	withIndicator?: boolean;
}

export default function Carousel({
	children,
	visibleItemsCount = 1,
	isInfinite,
	withIndicator = false,
}: Props) {
	const [timeoutInProgress, setTimeoutInProgress] = useState(false);
	const [isTransitionEnabled, setTransitionEnabled] = useState(true);

	const itemsLength = useMemo(() => Children.count(children), [children]);
	const isRepeating = useMemo(
		() => isInfinite && Children.count(children) > visibleItemsCount,
		[children, isInfinite, visibleItemsCount]
	);

	const [currentIndex, setCurrentIndex] = useState(
		isRepeating ? visibleItemsCount : 0
	);
	const [touchPosition, setTouchPosition] = useState<number | null>(null);

	useEffect(() => {
		if (isRepeating) {
			if (currentIndex === visibleItemsCount || currentIndex === itemsLength) {
				setTransitionEnabled(true);
			}
		}
	}, [currentIndex, isRepeating, visibleItemsCount, itemsLength]);

	/**
	 * Move forward to the next item
	 */
	const nextItem = () => {
		const isOnEdgeForward = currentIndex > itemsLength;
		if (isOnEdgeForward) {
			setTimeoutInProgress(true);
		}

		if (isRepeating || currentIndex < itemsLength - visibleItemsCount) {
			setCurrentIndex((prevState) => prevState + 1);
		}
	};

	/**
	 * Move backward to the previous item
	 */
	const previousItem = () => {
		const isOnEdgeBack = isRepeating
			? currentIndex <= visibleItemsCount
			: currentIndex === 0;

		if (isOnEdgeBack) {
			setTimeoutInProgress(true);
		}

		if (isRepeating || currentIndex > 0) {
			setCurrentIndex((prevState) => prevState - 1);
		}
	};

	/**
	 * Handle when the user start the swipe gesture
	 * @param e TouchEvent
	 */
	const handleTouchStart = (e: TouchEvent) => {
		// Save the first position of the touch
		const touchDown = e.touches[0].clientX;
		setTouchPosition(touchDown);
	};

	/**
	 * Handle when the user move the finger in swipe gesture
	 * @param e TouchEvent
	 */
	const handleTouchMove = (e: TouchEvent) => {
		// Get initial location
		const touchDown = touchPosition;

		// Proceed only if the initial position is not null
		if (touchDown === null) {
			return;
		}

		// Get current position
		const currentTouch = e.touches[0].clientX;

		// Get the difference between previous and current position
		const diff = touchDown - currentTouch;

		// Go to next item
		if (diff > 5) {
			nextItem();
		}

		// Go to previous item
		if (diff < -5) {
			previousItem();
		}

		// Reset initial touch position
		setTouchPosition(null);
	};

	/**
	 * Handle when carousel transition's ended
	 */
	const handleTransitionEnd = () => {
		if (isRepeating) {
			if (currentIndex === 0) {
				setTransitionEnabled(false);
				setCurrentIndex(itemsLength);
			} else if (currentIndex === itemsLength + visibleItemsCount) {
				setTransitionEnabled(false);
				setCurrentIndex(visibleItemsCount);
			}
		}

		setTimeoutInProgress(false);
	};

	/**
	 * Render previous items before the first item
	 */
	const extraPreviousItems = useMemo(() => {
		const output = [];
		for (let index = 0; index < visibleItemsCount; index++) {
			output.push(Children.toArray(children)[itemsLength - 1 - index]);
		}
		output.reverse();
		return output;
	}, [children, itemsLength, visibleItemsCount]);

	/**
	 * Render next items after the last item
	 */
	const extraNextItems = useMemo(() => {
		const output = [];
		for (let index = 0; index < visibleItemsCount; index++) {
			output.push(Children.toArray(children)[index]);
		}
		return output;
	}, [children, visibleItemsCount]);

	const isNextButtonVisible = useMemo(() => {
		return isRepeating || currentIndex < itemsLength - visibleItemsCount;
	}, [isRepeating, currentIndex, itemsLength, visibleItemsCount]);

	const isPrevButtonVisible = useMemo(
		() => isRepeating || currentIndex > 0,
		[isRepeating, currentIndex]
	);
	return (
		<div className='w-full flex flex-col relative'>
			{isPrevButtonVisible && <Button onPress={previousItem}>prev</Button>}
			{isNextButtonVisible && <Button onPress={nextItem}>next</Button>}
			<div
				className='overflow-hidden w-full h-full'
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
			>
				<div
					className={`flex gap-2 transition-all scrollbar-hide [&>*]:w-[400px] [&>*]:flex-shrink-0 [&>*]:flex-grow`}
					style={{
						transform: `translateX(-${currentIndex * 400}px)`,
						transition: !isTransitionEnabled ? 'none' : undefined,
					}}
					onTransitionEnd={() => handleTransitionEnd()}
				>
					{isRepeating && extraPreviousItems}
					{children}
					{isRepeating && extraNextItems}
				</div>
			</div>
		</div>
	);
}
