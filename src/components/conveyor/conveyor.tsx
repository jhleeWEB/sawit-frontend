export default function Conveyor() {
	return (
		<div className='overflow-hidden'>
			<div className='flex gap-2 group'>
				<section className='flex gap-2 animate-slide group-hover:pause'>
					<div className='min-h-[180px] min-w-[120px] bg-slate-100'>1</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-200'>2</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-300'>3</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-400'>4</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-500'>5</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-600'>6</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-700'>7</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-800'>8</div>
				</section>
				<section
					aria-hidden
					className='flex gap-2 animate-slide group-hover:pause'
				>
					<div className='min-h-[180px] min-w-[120px] bg-slate-100'>1</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-200'>2</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-300'>3</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-400'>4</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-500'>5</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-600'>6</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-700'>7</div>
					<div className='min-h-[180px] min-w-[120px] bg-slate-800'>8</div>
				</section>
			</div>
		</div>
	);
}
