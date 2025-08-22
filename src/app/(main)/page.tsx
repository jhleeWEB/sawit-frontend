import Post from '@/features/post';

export default async function Home() {
	const posts = [
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
		Post,
	];
	return (
		<>
			<div className='col-span-3'>
				<div className='bg-red-200 min-h-[128px] w-full'>header</div>
			</div>
			<div className='flex flex-col col-start-1 col-span-2 gap-4 px-4'>
				{posts.map((Post, i) => (
					<Post key={i} />
				))}
			</div>
			<div className='col-start-3 col-span-1 bg-teal-100 flex flex-col'>
				<div className='sticky top-0 bg-red-300 min-h-[450px]'>info</div>
			</div>
		</>
	);
}
