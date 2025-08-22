"use client";

import ImageCropModal from "@/features/image-crop";

import {
  Avatar,
  Divider,
  Form,
  Input,
  Modal,
  ModalContent,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { PiImageSquareThin } from "react-icons/pi";

export default function CreateCommunity() {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [tempBanner, setTempBanner] = useState("");
  const [icon, setIcon] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="col-start-1 col-span-2">
        <Form>
          <Input
            fullWidth
            required
            label="커뮤니티 이름을 작성해주세요."
            value={communityName}
            onValueChange={setCommunityName}
          />
          <small>{communityName.length}</small>
          <Textarea
            fullWidth
            label="커뮤니티의 대해서 말해주세요."
            value={communityDescription}
            onValueChange={setCommunityDescription}
          />
          <small>{communityDescription.length}</small>
          <div className="w-full">
            <div>
              <h3>배너를 넣어보세요</h3>
              <Input
                type="file"
                radius="full"
                startContent={<PiImageSquareThin size={26} />}
                src={banner}
                onChange={(event) => {
                  if (event.target.files) {
                    const [file] = event.target.files;
                    const url = URL.createObjectURL(file);
                    setTempBanner(url);
                    onOpen();
                  }
                }}
              />
              <ImageCropModal
                src={tempBanner}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                setImage={setBanner}
              />
            </div>
            <div>
              <h3>아이콘 넣어보세요~</h3>
              <Input
                type="file"
                radius="full"
                startContent={<PiImageSquareThin size={26} />}
                src={icon}
                onChange={(event) => {
                  if (event.target.files) {
                    const [file] = event.target.files;
                    const url = URL.createObjectURL(file);
                    setIcon(url);
                  }
                }}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="col-start-3 col-span-1 bg-teal-100 flex flex-col p-4 pt-16">
        <div className="w-full bg-blue-400 rounded-lg shadow-lg">
          {banner ? (
            <div
              style={{
                /* @ts-expect-error custom style property added*/
                "--image-url": `url(${banner})`,
              }}
              className={`h-[60px] bg-no-repeat bg-cover bg-center bg-[image:var(--image-url)]`}
            />
          ) : (
            <div className={`h-[60px] bg-red-300`} />
          )}
          <Divider />
          <div className="flex items-center gap-4 m-4">
            <Avatar isBordered src={icon} />
            <div>
              <h1 className="w-full text-2xl font-bold break-words">
                p/{communityName}
              </h1>
              <span>
                <small>1 member</small>
                <span>•</span>
                <small>1 online</small>
              </span>
            </div>
          </div>
          <p className="break-words">{communityDescription}</p>
        </div>
      </div>
    </>
  );
}
