"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { PiPencilSimpleLine } from "react-icons/pi";

interface Props {
  initialName?: string;
}

export default function NameEditor({ initialName }: Props) {
  const [name, setName] = useState(() => initialName || "");
  const [toggleEdit, setToggleEdit] = useState(false);

  return (
    <>
      {toggleEdit ? (
        <div className="w-full flex items-center justify-between">
          <span>
            <small>이름</small>
            <h1 className="font-bold">{name}</h1>
          </span>
          <Button
            isIconOnly
            radius="full"
            variant="light"
            startContent={<PiPencilSimpleLine size={20} />}
            onPress={() => setToggleEdit(true)}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between">
          <span>
            <small>이름</small>
            <h1 className="font-bold">{name}</h1>
          </span>
          <Button
            isIconOnly
            radius="full"
            variant="light"
            className="align-bottom"
            startContent={<PiPencilSimpleLine size={20} />}
            onPress={() => setToggleEdit(true)}
          />
        </div>
      )}
    </>
  );
}
