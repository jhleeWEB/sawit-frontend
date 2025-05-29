import Post from '@/components/Post';

export default function P() {
	return (
		<section>
			<div className='bg-slate-400 min-h-40'>title header</div>
			<div className='grid grid-cols-3'>
				<div className='col-span-2 bg-slate-300 p-4'>
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
				</div>
			</div>
		</section>
	);
}
