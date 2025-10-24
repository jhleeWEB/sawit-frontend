"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { CirclePicker, ColorChangeHandler } from "react-color";

interface Props {
  isOpen: boolean;
  color?: string;
  onOpenChange: () => void;
  onChangeComplete: ColorChangeHandler;
}
export default function ColorPickerModal({
  isOpen,
  onOpenChange,
  onChangeComplete,
}: Props) {
  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>아바타 변경</ModalHeader>
            <ModalBody>
              <small>모두에게 보여줄 나만의 아바타를 업로드하세요</small>
              <div className="flex justify-center">
                <CirclePicker
                  colors={[
                    "#f44336",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#009688",
                    "#4caf50",
                    "#8bc34a",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                    "#ff9800",
                    "#ff5722",
                    "#795548",
                    "#607d8b",
                  ]}
                  onChangeComplete={onChangeComplete}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                radius="full"
                onPress={() => {
                  const parentEl = document.getElementById(
                    "community-main-container",
                  );
                  if (parentEl) {
                    parentEl.style.backgroundColor = "";
                  }
                  onClose();
                }}
              >
                초기화
              </Button>
              <Button color="primary" radius="full" onPress={onClose}>
                저장
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
