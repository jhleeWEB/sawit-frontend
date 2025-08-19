import { PropsWithChildren } from 'react';

export default function ContentContainer({ children }: PropsWithChildren) {
	return <section className='col-start-2 col-span-1'>{children}</section>;
}
