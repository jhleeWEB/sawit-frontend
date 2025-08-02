import {
	Button,
	Checkbox,
	Input,
	Modal,
	ModalContent,
	ModalFooter,
} from '@heroui/react';

export default function LoginModal() {
	return (
		<Modal>
			<ModalContent>
				{(onClose) => (
					<>
						<Input type='email' />
						<Input type='password' />
						<div>
							<Checkbox>기억하기</Checkbox>
						</div>
						<ModalFooter>
							<Button onPress={onClose}>취소</Button>
							<Button onPress={onClose}>로그인</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
