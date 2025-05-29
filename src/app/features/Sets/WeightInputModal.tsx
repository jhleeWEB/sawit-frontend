import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalProps,
} from '@heroui/react';

const numpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];
const custompad = [2.5, 5, 10, 20, '+5', '-5', '+', '-'];

export default function WeightInputModal({
	...props
}: Omit<ModalProps, 'children'>) {
	return (
		<Modal placement='bottom-center' backdrop='transparent' {...props}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Modal Title
						</ModalHeader>
						<ModalBody className='flex flex-row'>
							<div className='grid grid-cols-3 gap-2 mr-2'>
								{numpad.map((num, i) => {
									return <button className='max-w-2'>{num}</button>;
								})}
							</div>
							<div className='grid grid-cols-[auto_auto] gap-2'>
								{custompad.map((num, i) => {
									return <Button>{num}</Button>;
								})}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								Close
							</Button>
							<Button color='primary' onPress={onClose}>
								Action
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
