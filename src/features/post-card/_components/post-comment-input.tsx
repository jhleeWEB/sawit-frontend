"use client";

import { Comment } from "@/service/fetch_comments";
import publishComment from "@/service/post/publish-comment";
import { Button, Form, Textarea, useDisclosure } from "@heroui/react";
import { FormEvent, useCallback, useState } from "react";
import { MemoComment } from "./memo-comment";
import { useSession } from "next-auth/react";
import SocialLoginModal from "@/components/modals/social-login-modal";

interface Props {
  postId: number;
}

export default function PostCommentInput({ postId }: Props) {
  const { data: session } = useSession();
  const [startConversation, setStartConversation] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [myComments, setMyComments] = useState<Comment[] | []>([]);
  const {
    isOpen: loginModalIsOpen,
    onOpen: loginModalOnOpen,
    onOpenChange: loginModalOnOpenChange,
  } = useDisclosure();

  const handleStartConversation = useCallback(() => {
    if (session?.user) {
      setStartConversation(true);
    } else {
      loginModalOnOpen();
    }
  }, [session?.user, setStartConversation, loginModalOnOpen]);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value || e.currentTarget.value === "") {
      setStartConversation(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const params = {
      post_id: postId,
      comment,
    };

    const res = await publishComment(params);
    if (res) {
      setMyComments((prev) => [...prev, res]);
      reset();
    }
    setIsLoading(false);
  };

  const reset = () => {
    setComment("");
    setStartConversation(false);
  };

  return (
    <>
      <Form
        className="relative mt-4"
        onSubmit={async (e) => await handleSubmit(e)}
      >
        {startConversation ? (
          <>
            <Textarea
              variant="bordered"
              radius="lg"
              autoFocus
              onBlur={handleOnBlur}
              value={comment}
              onValueChange={setComment}
            />
            <div className="flex w-full justify-end mt-2">
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
            onPress={() => handleStartConversation()}
          >
            대화를 시작해보세요
          </Button>
        )}
      </Form>
      <SocialLoginModal
        isOpen={loginModalIsOpen}
        onOpenChange={loginModalOnOpenChange}
      />
      {/* 임시 내가 올린 댓글 보여주기, 다시 접속하면 서버 우선순위 대로 표기 */}
      {myComments.length > 0 && (
        <section className="w-full mt-4 bg-yellow-50 rounded-xl">
          {myComments.map((comment) => {
            const commentNode = {
              ...comment,
              children: [],
            };
            return <MemoComment key={comment.id} commentNode={commentNode} />;
          })}
        </section>
      )}
    </>
  );
}
