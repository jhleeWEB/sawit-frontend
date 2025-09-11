"use client";

import postComment from "@/service/post/post_comment";
import { Button, Form, Textarea } from "@heroui/react";
import { FormEvent, useState } from "react";

interface Props {
  postId: number;
}

export default function PostCommentInput({ postId }: Props) {
  const [toggle, setToggle] = useState(false);
  const [comment, setComment] = useState("");
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
      comment,
    };

    const res = await postComment(params);
    if (res) {
      reset();
    }
    setIsLoading(false);
  };

  const reset = () => {
    setComment("");
    setToggle(false);
  };

  return (
    <Form
      className="relative mt-4"
      onSubmit={async (e) => await handleSubmit(e)}
    >
      {toggle ? (
        <>
          <Textarea
            variant="bordered"
            radius="lg"
            autoFocus
            onBlur={handleOnBlur}
            value={comment}
            onValueChange={setComment}
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
              댓글
            </Button>
          </div>
        </>
      ) : (
        <Button
          fullWidth
          variant="bordered"
          radius="full"
          className="text-neutral-400 justify-start"
          onPress={() => setToggle(true)}
        >
          대회를 시작해보세요
        </Button>
      )}
    </Form>
  );
}
