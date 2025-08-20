import { Button } from '@heroui/react';
import { IoAtCircleSharp } from 'react-icons/io5';
import {
	PiArrowFatLineDownThin,
	PiArrowFatLineUpThin,
	PiChatCircleDotsThin,
	PiDotsThreeOutlineThin,
	PiShareFatThin,
} from 'react-icons/pi';

export default function Post() {
	const boardName = 'p/게시판 이름';
	const uploadedDate = '9 시간전';
	const boardDescription =
		'게시판 소개글이나 설명글이 있다면 여기에 간략하게 표기';

	return (
		<a className='flex flex-col w-full border rounded-lg p-4 gap-2'>
			<span className='flex w-full justify-between'>
				<span className='flex max-w-[50%] flex-wrap items-center gap-1'>
					<span className='flex items-center'>
						<IoAtCircleSharp size={32} />
						<small className='text-nowrap'>{boardName}</small>
					</span>
					<span>•</span>
					<small className='text-nowrap'>{uploadedDate}</small>
					<span>•</span>
					<small className='text-nowrap'>{boardDescription}</small>
				</span>

				<div className='flex items-center gap-2'>
					<Button size='sm' radius='full' className='bg-teal-500 text-white'>
						함께하기
					</Button>
					<PiDotsThreeOutlineThin size={20} />
				</div>
			</span>
			<h3>포스트 타이틀은 여기에 넣어요.</h3>
			<div className='w-full min-h-[200px] bg-yellow-200 rounded-lg'>image</div>
			{/* 하단 버튼 그룹 */}
			<div className='flex gap-2'>
				{/* 올려/내려 버튼 그룹 */}
				<div className='flex items-center bg-default-300 rounded-full'>
					<Button
						isIconOnly
						radius='full'
						size='sm'
						className='hover:bg-default-200'
					>
						<PiArrowFatLineUpThin size={20} className='hover:text-red-500' />
					</Button>
					<small>32</small>
					<Button
						isIconOnly
						radius='full'
						size='sm'
						className='hover:bg-default-200'
					>
						<PiArrowFatLineDownThin size={20} className='hover:text-blue-500' />
					</Button>
				</div>
				{/* 댓글 버튼 */}
				<Button radius='full' size='sm' className='hover:bg-default-200'>
					<PiChatCircleDotsThin size={20} />
					<small className='text-[13px]'>6</small>
				</Button>
				{/* 공유하기 버튼 */}
				<Button radius='full' size='sm' className='hover:bg-default-200'>
					<PiShareFatThin size={20} />
					<small className='text-[13px]'>공유</small>
				</Button>
			</div>
		</a>
	);
}
