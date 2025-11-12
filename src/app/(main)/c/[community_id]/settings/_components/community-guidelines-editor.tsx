"use client";

import { Button, useDisclosure } from "@heroui/react";
import { CommunityGuidelineModal } from "../_modals/community-guideline-modal";
import {
  Guideline,
  useCommunityFormDispatch,
  useCommunityFormState,
} from "@/app/(main)/create-community/_components/community-form-provider";
import { PiTrashSimple, PiNotePencilLight } from "react-icons/pi";
import { CommunityEditGuidelineModal } from "../_modals/community-edit-guideline-modal";
import { useCallback } from "react";

export function CommunityGuidelineEditor({}: { guidelines?: Guideline[] }) {
  const { guidelines } = useCommunityFormState();
  const dispatch = useCommunityFormDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();

  const onSaveGuidelines = ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }) => {
    const payload: Guideline[] = [{ name, description }];
    if (guidelines) {
      guidelines.forEach((n) => payload.push(n));
    }
    dispatch({ type: "update_guidelines", payload });
    onClose();
  };
  const onEditGuidelines = ({
    name,
    description,
    index,
  }: {
    index: number;
    name: string;
    description?: string;
  }) => {
    if (guidelines) {
      const payload = [...guidelines];
      payload[index] = { name, description };
      dispatch({ type: "update_guidelines", payload });
    }
    onEditClose();
  };

  const deleteGuideline = useCallback(
    (index: number) => {
      if (guidelines) {
        const payload = [...guidelines];
        payload.splice(index, 1);
        dispatch({ type: "update_guidelines", payload });
      }
    },
    [guidelines, dispatch],
  );

  return (
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">이용 수칙</h1>
        <Button radius="full" size="sm" onPress={onOpen}>
          추가하기
        </Button>
      </div>
      {/* 수칙 목록 */}

      <ul>
        {guidelines && guidelines.length > 0 ? (
          guidelines.map((n, i) => (
            <li
              className="flex items-center justify-between"
              key={n.name + "_" + i}
            >
              <span>
                <h3 className="text-md font-medium">{n.name}</h3>
                <small>{n.description}</small>
              </span>
              <span className="flex gap-2">
                <Button
                  isIconOnly
                  radius="full"
                  color="danger"
                  size="sm"
                  onPress={() => deleteGuideline(i)}
                  startContent={<PiTrashSimple size={18} />}
                />
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  startContent={<PiNotePencilLight size={18} />}
                  onPress={onEditOpen}
                />
                <CommunityEditGuidelineModal
                  index={i}
                  initialState={{ name: n.name, description: n.description }}
                  isOpen={isEditOpen}
                  onOpenChange={onEditOpenChange}
                  onSave={onEditGuidelines}
                />
              </span>
            </li>
          ))
        ) : (
          <li className="text-center">등록된 이용 수칙이 없습니다.</li>
        )}
      </ul>

      <CommunityGuidelineModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSave={onSaveGuidelines}
      />
    </div>
  );
}
