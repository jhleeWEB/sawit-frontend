"use client";

import publishComment from "@/service/post/publish-comment";
import uploadCommentDislike from "@/service/post/upload-comment-dislike";
import uploadCommentLike from "@/service/post/upload-comment-like";
import { Button, Form, Textarea, useDisclosure } from "@heroui/react";
import { FormEvent, MouseEvent, useMemo, useState } from "react";
import {
  PiArrowFatDownThin,
  PiArrowFatUpThin,
  PiChatCircleDotsThin,
} from "react-icons/pi";
import { CommentNode, MemoComment } from "./memo-comment";
import { Comment } from "@/service/fetch_comments";
import { useSession } from "next-auth/react";
import SocialLoginModal from "@/components/modals/social-login-modal";

interface Props {
  comment: CommentNode;
}

export default function CommentActionRow({ comment }: Props) {
  const [toggle, setToggle] = useState(false);
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(() => comment.likes - comment.dislikes);
  const [myReplies, setMyReplies] = useState<Comment[] | []>([]);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { post_id, id, children } = comment;
  const childrenCount = useMemo(() => children.length, [children]);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value || e.currentTarget.value === "") {
      setToggle(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const params = {
      post_id,
      comment: reply,
      parent_id: id,
    };

    const res = await publishComment(params);
    if (res) {
      setMyReplies((prev) => [...prev, res]);
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
      <div
        className="relative flex left-[-8px]"
        onClickCapture={(e: MouseEvent<HTMLDivElement>) => {
          if (!session) {
            onOpen();
            e.stopPropagation();
          }
        }}
      >
        <div className="flex items-center">
          <Button
            variant="light"
            radius="full"
            isIconOnly
            size="sm"
            startContent={
              <PiArrowFatUpThin size={18} className="hover:text-red-500" />
            }
            onPress={async () => {
              const res = await uploadCommentLike({ commentId: id });
              if (res === "cancelled") {
                setLikes((prev) => prev - 1);
              } else {
                setLikes((prev) => prev + 1);
              }
            }}
          />
          <small className="mx-1">{likes}</small>
          <Button
            variant="light"
            radius="full"
            size="sm"
            isIconOnly
            startContent={
              <PiArrowFatDownThin size={18} className="hover:text-blue-500" />
            }
            onPress={async () => {
              const res = await uploadCommentDislike({ commentId: id });
              if (res === "disliked") {
                setLikes((prev) => prev - 1);
              } else {
                setLikes((prev) => prev + 1);
              }
            }}
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
      {myReplies.length > 0 && (
        <section className="bg-yellow-50 rounded-xl">
          {myReplies.map((myReply) => {
            const myCommentNode = {
              ...myReply,
              children: [],
            };
            return <MemoComment key={myReply.id} commentNode={myCommentNode} />;
          })}
        </section>
      )}
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
              답변하기
            </Button>
          </div>
        </Form>
      )}
      <SocialLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
