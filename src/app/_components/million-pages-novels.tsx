export default function MillionPagesNovels() {
	return (
		<div>
			<h1 className='font-bold text-lg mt-4 mb-2'>밀리언 페이지</h1>
			<div className='overflow-hidden rounded-lg'>
				<div className='flex gap-2 group'>
					<section className='flex gap-2 animate-slide group-hover:pause'>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
							<div key={n + '-' + i} className='flex flex-col gap-2'>
								<div
									className={`p-4 rounded-lg items-end min-h-[120px] min-w-[90px] bg-slate-${
										i + 1
									}00 `}
								>
									{n}
								</div>
								<small className='text-xs'>제목 여기에 넣기</small>
								<small className='text-[10px] text-slate-600'>
									장르는 여기에
								</small>
							</div>
						))}
					</section>
					<section
						aria-hidden
						className='flex gap-2 animate-slide group-hover:pause'
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
							<div key={n + '-' + i}>
								<div
									className={`p-4 rounded-lg items-end min-h-[120px] min-w-[90px] bg-slate-${
										i + 1
									}00 `}
								>
									{n}
								</div>
								<small className='text-xs'>제목 여기에 넣기</small>
								<small className='text-[10px] text-slate-600'>
									장르는 여기에
								</small>
							</div>
						))}
					</section>
				</div>
			</div>
		</div>
	);
}
