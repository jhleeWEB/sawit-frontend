"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Textarea,
} from "@heroui/react";
import { useState } from "react";

export function CommunityGuidelineModal({
  isOpen,
  onOpenChange,
  onSave,
}: Omit<ModalProps, "children"> & {
  initialState?: { name: string; description?: string };
  onSave: ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>규칙명과 설명</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div>
              <Input
                size="sm"
                label="이용 수칙 이름"
                maxLength={100}
                value={name}
                onValueChange={setName}
              />
              <small className="flex justify-end">최대 100자</small>
            </div>
            <div>
              <Textarea
                size="sm"
                label="설명"
                maxLength={500}
                value={description}
                onValueChange={setDescription}
              />
              <small className="flex justify-end">최대 500자</small>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            radius="full"
            onPress={() => {
              onSave({ name, description });
              setName("");
              setDescription("");
            }}
          >
            추가
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
