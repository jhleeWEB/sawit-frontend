import Icon from '@/components/Icon';
import { Chip, Image } from '@heroui/react';

export default function NovelTile() {
	return (
		<div className='relative min-w-30 max-w-48 mr-4 mb-4'>
			<Chip
				className='absolute z-50 right-2 top-2 font-bold'
				color='success'
				size='sm'
			>
				NEW
			</Chip>
			<Image
				alt='book cover image'
				radius='sm'
				height={240}
				src='/sample2.png'
			/>
			<small>판타지</small>
			<h4>제목 여기에 작성하기</h4>
			<small>작가이름</small>
			<div className='flex w-full justify-between'>
				<div className='flex items-center'>
					<Icon fill='none' icon='Star' size={14} />
					<small>2,343</small>
				</div>
				<div className='flex items-center'>
					<Icon fill='none' icon='Eye' size={14} />
					<small>234,212</small>
				</div>
			</div>
		</div>
	);
}
