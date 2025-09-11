"use client";

import publishComment from "@/service/post/publish_comment";
import { Button, Form, Textarea } from "@heroui/react";
import { FormEvent, useState } from "react";
import {
  PiArrowFatDownThin,
  PiArrowFatUpThin,
  PiChatCircleDotsThin,
} from "react-icons/pi";

interface Props {
  postId: number;
  commentId: number;
  childrenCount: number;
}

export default function CommentActionRow({
  postId,
  commentId,
  childrenCount,
}: Props) {
  const [toggle, setToggle] = useState(false);
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value || e.currentTarget.value === "") {
      setToggle(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const params = {
      post_id: postId,
      comment: reply,
      parent_id: commentId,
    };

    const res = await publishComment(params);
    if (res) {
      reset();
    }
    setIsLoading(false);
  };

  const reset = () => {
    setReply("");
    setToggle(false);
  };

  return (
    <>
      <div className="relative flex left-[-8px]">
        <div className="flex items-center">
          <Button
            variant="light"
            radius="full"
            isIconOnly
            size="sm"
            startContent={
              <PiArrowFatUpThin size={18} className="hover:text-red-500" />
            }
          />
          <small className="mx-1">0</small>
          <Button
            variant="light"
            radius="full"
            size="sm"
            isIconOnly
            startContent={
              <PiArrowFatDownThin size={18} className="hover:text-blue-500" />
            }
          />
        </div>
        <div>
          <Button
            variant="light"
            radius="full"
            size="sm"
            startContent={
              <PiChatCircleDotsThin size={18} className="hover:text-blue-500" />
            }
            onPress={() => setToggle(true)}
          >
            답변 ({childrenCount})
          </Button>
        </div>
      </div>
      {toggle && (
        <Form onSubmit={handleSubmit} className="w-full">
          <Textarea
            variant="bordered"
            radius="lg"
            autoFocus
            onBlur={handleOnBlur}
            value={reply}
            onValueChange={setReply}
          />
          <div className="flex justify-end mt-2">
            <Button
              isDisabled={isLoading}
              variant="light"
              radius="full"
              size="sm"
            >
              취소
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              color="primary"
              radius="full"
              size="sm"
            >
              답변하기
            </Button>
          </div>
        </Form>
      )}
    </>
  );
}
