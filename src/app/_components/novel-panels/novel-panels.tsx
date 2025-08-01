interface Props {
	items: number[];
	title: string;
}
export default function NovelPanels({ title, items }: Props) {
	return (
		<section>
			<div className='text-lg font-bold mt-8 mb-4'>{title}</div>
			<div className='grid grid-cols-6 gap-2'>
				{items.map((n, i) => (
					<div
						key={n + '-' + i}
						className={`flex items-end aspect-[1/2] rounded-lg bg-slate-${
							i + 1
						}00 `}
					>
						<div className='h-1/2 w-full flex flex-col rounded-b-lg justify-end pb-2 bg-gradient-to-t from-gray-700 to-transparent'>
							<p className='text-center font-bold text-white'>
								{n}. 제목은 여기에
							</p>
							<small className='text-center text-slate-100'>조희수</small>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
