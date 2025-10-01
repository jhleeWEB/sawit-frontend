"use client";

import updateUsername from "@/service/update-username";
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  redirectUrl?: string;
}
export default function UsernameEditModal(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>별명 변경</ModalHeader>
            <ModalBody>
              <small>모두에게 표시될 별명을 설정해주세요</small>
              <Input
                variant="bordered"
                value={username}
                onValueChange={setUsername}
              />
              <small className="flex justify-end text-neutral-400">
                {username.length}
              </small>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                onPress={async () => {
                  setIsLoading(true);
                  const result = await updateUsername(username);
                  console.log(result);
                  if (result === "success") {
                    addToast({
                      title: "프로필 별명 변경",
                      description: "프로필 별명 변경 성공했습니다",
                      color: "success",
                    });
                    setIsLoading(false);
                    setUsername("");
                    onClose();
                  } else if (result === "duplicate") {
                    addToast({
                      title: "프로필 별명 변경",
                      description: "프로필 별명이 이미 존재합니다",
                      color: "warning",
                    });
                    setIsLoading(false);
                  } else {
                    addToast({
                      title: "프로필 별명 변경",
                      description: "프로필 별명 변경 실패했습니다",
                      color: "danger",
                    });
                    setIsLoading(false);
                  }
                }}
              >
                번경하기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
