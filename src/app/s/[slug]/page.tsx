import { Thread } from '@/app/models/thread';
import Title from '@/components/Title';
import PostInfiniteScroll from '@/features/PostInfiniteScroll';
import http from '@/http';

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
	const threadName = (await params).slug;
	const res = await http.get<Thread>(`/thread/${threadName}`);
	const { name } = res.data;

	return (
		<section className='h-full overflow-auto '>
			<div className='bg-slate-400 min-h-40'>
				<Title>{name}</Title>
			</div>
			<div className='grid grid-cols-3'>
				<PostInfiniteScroll threadName={name} />
			</div>
		</section>
	);
}
