import { PropsWithChildren } from 'react';

export default function InfoContainer({ children }: PropsWithChildren) {
	return <div className='col-start-3 col-span-1'>{children}</div>;
}
