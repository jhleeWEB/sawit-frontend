"use client";

import { getCroppedImg } from "@/utils/create-image";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import Cropper from "react-easy-crop";

interface Props {
  src: string;
  isOpen: boolean;
  onOpenChange: () => void;
  setImage: (blob: string) => void;
}

export default function ImageCropModal({
  src = "",
  isOpen,
  onOpenChange,
  setImage,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState("");

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const url = await getCroppedImg(src, croppedAreaPixels);
    setImageUrl(url as string);
  };

  return (
    <Modal
      className="relative"
      isOpen={isOpen}
      size="xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>커뮤니티를 배너로 꾸며보세요~</ModalHeader>
            <ModalBody className="relative min-h-[500px] bg-black">
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <Cropper
                  showGrid={false}
                  image={src}
                  crop={crop}
                  aspect={10 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button
                onClick={() => {
                  setImage(imageUrl);
                  onClose();
                }}
              >
                저장
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
