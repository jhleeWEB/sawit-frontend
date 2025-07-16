import Link from 'next/link';

export default function Home() {
	console.log(new Blob(['something somthine']));
	return (
		<section>
			home
			<div className='flex flex-col'>
				<Link color='primary' href='/a/hyesun'>
					auther profile page
				</Link>
				<Link color='primary' href='/a/hyesun/settings'>
					author settings page
				</Link>
				<Link color='primary' href='/a/hyesun/publish'>
					author publish book page
				</Link>
				<Link color='primary' href='/a/hyesun/TheFirstbook'>
					author's book page
				</Link>
				<Link color='primary' href='/a/hyesun/TheFirstbook/settings'>
					author's book settings page
				</Link>
				<Link color='primary' href='/a/hyesun/TheFirstbook/cover'>
					author's book cover page
				</Link>
				<Link color='primary' href='/a/hyesun/TheFirstbook/1'>
					author's book 1
				</Link>
				<Link color='primary' href='/a/hyesun/TheFirstbook/2'>
					author's book 2
				</Link>
				<Link color='primary' href='/a/hyesun/TheFirstbook/3'>
					author's book 3
				</Link>
			</div>
		</section>
	);
}
