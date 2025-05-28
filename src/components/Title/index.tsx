export default function Title(props: React.PropsWithChildren) {
	return (
		<h1 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
			{props.children}
		</h1>
	);
}
