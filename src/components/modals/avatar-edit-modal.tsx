"use client";

import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from "@heroui/react";
import Cropper, { Area } from "react-easy-crop";
import { compressImageToMaxBytes } from "@/utils/image-compression/compress-image-to-max-bytes";
import updateUserIcon from "@/service/update-user-icon";
import { cropToBlob } from "@/utils/image-compression/crop-to-blob";
import { MB } from "@/utils/consts";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  redirectUrl?: string;
}
export default function AvatarEditModal({ isOpen, onOpenChange }: Props) {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const [areaPixel, setAreaPixel] = useState<Area | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCropComplete = (_: Area, pixels: Area) => setAreaPixel(pixels);
  const handleFileChange = async (f: File | null) => {
    setBusy(true);
    if (!f) return;
    let compressed = f;
    if (compressed.size >= 2 * MB) {
      compressed = await compressImageToMaxBytes(f, { maxBytes: 2 * MB });
    }
    const url = URL.createObjectURL(compressed);
    setFile(compressed);
    setPreview(url);
    setBusy(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>아바타 변경</ModalHeader>
            <ModalBody>
              <small>모두에게 보여줄 나만의 아바타를 업로드하세요</small>
              {file ? (
                <div className="flex justify-center">
                  <div className="relative w-[124px] h-[124px]">
                    <Cropper
                      image={preview}
                      zoom={zoom}
                      crop={crop}
                      aspect={1 / 1}
                      cropShape="round"
                      minZoom={1}
                      maxZoom={4}
                      showGrid={false}
                      onZoomChange={setZoom}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      restrictPosition
                      classes={{ containerClassName: "!rounded-xl" }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple={false}
                    onChange={(e) => {
                      handleFileChange(e.target.files?.[0] || null);
                    }}
                  />
                  <Button
                    color="primary"
                    radius="full"
                    fullWidth
                    onPress={() => fileInputRef.current?.click()}
                    disabled={busy}
                    isLoading={busy}
                  >
                    파일 선택
                  </Button>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                disabled={busy}
                isLoading={busy}
                onPress={onClose}
              >
                취소
              </Button>
              <Button
                color="primary"
                disabled={busy}
                isLoading={busy}
                onPress={async () => {
                  setBusy(true);
                  if (file && preview && areaPixel) {
                    const blob = await cropToBlob(preview, areaPixel, {
                      mime: file.type,
                      quality: 0.92,
                      outHeight: 128,
                      outWidth: 128,
                    });
                    const result = await updateUserIcon({ icon: blob });
                    if (result) {
                      addToast({
                        title: "아바타 번경",
                        description: "아바타 변경 성공했습니다",
                        color: "success",
                      });
                      onClose();
                    } else {
                      addToast({
                        title: "아바타 번경",
                        description: "아바타 변경 실패했습니다",
                        color: "danger",
                      });
                    }
                  } else {
                    addToast({
                      title: "아바타 번경",
                      description: "이미지를 먼저 선택해주세요",
                      color: "warning",
                    });
                  }
                  setBusy(false);
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
