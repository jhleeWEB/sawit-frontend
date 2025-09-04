"use client";
import { Button, Form, Input, Spinner } from "@heroui/react";
import DragNDropMediaInput from "./d-n-d-media";
import EditorWrapper from "./editor";
import { FormEvent, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import CommunitySearchBar from "@/app/(main)/create-post/_components/community-search-bar";
import createNewPost from "../_apis/create-new-post";

//@ts-expect-error payload any type
function reducer(state: FormState, action: { type: string; payload }) {
  switch (action.type) {
    case "update_files":
      state.files = [...action.payload];
      return state;
    case "update_text":
      state.text = action.payload;
      return state;
    case "update_title":
      state.title = action.payload;
      return state;
    case "update_community_id":
      state.communityId = action.payload;
      return state;
  }
  return state;
}

interface FormState {
  communityId: number;
  title: string;
  files: File[] | [];
  text: string;
}

const initialState = {
  communityId: 0,
  title: "",
  files: [],
  text: "",
};

export default function PostForm() {
  const route = useRouter();
  const [formState, formDispatch] = useReducer(reducer, initialState);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);
    const res = await createNewPost({ ...formState });

    if (res) {
      route.push(`/p/${res.community_id}/${res.id}`);
      setIsPosting(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      id="community-post-form"
      className="flex flex-col"
    >
      <CommunitySearchBar formDispatch={formDispatch} />
      <Input
        isRequired
        name="title"
        variant="bordered"
        placeholder="제목"
        onValueChange={(value: string) =>
          formDispatch({ type: "update_title", payload: value })
        }
      />
      <DragNDropMediaInput formDispatch={formDispatch} />
      <EditorWrapper formDispatch={formDispatch} />
      <div className="w-full flex justify-end gap-2 ">
        <Button radius="full" variant="light" className="border">
          임시저장
        </Button>
        <Button radius="full" variant="flat" color="primary" type="submit">
          게시하기
        </Button>
      </div>
      {isPosting && (
        <div className="absolute top-0 left-0 z-50 min-w-full min-h-dvh flex flex-col items-center justify-center backdrop-blur-sm">
          <Spinner />
          게시물 올리는 중 입니다! 조금만 기다려주세요~
        </div>
      )}
    </Form>
  );
}
