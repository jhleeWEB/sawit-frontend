const novels = [1, 2, 3, 4, 5, 6];

export default function RecentTop6Novels() {
	return (
		<div className='grid grid-cols-6 gap-2'>
			{novels.map((novel, i) => (
				<div
					key={novel + '-' + i}
					className={`col-span-1 h-[230px] rounded-lg bg-slate-${i + 1}00`}
				>
					{novel}
				</div>
			))}
		</div>
	);
}
