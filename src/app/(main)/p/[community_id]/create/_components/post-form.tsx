"use client";
import { Button, Form, Input, Tab, Tabs } from "@heroui/react";
import DragNDropMediaInput from "./d-n-d-media";
import { FormEvent, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import CommunitySearchBar from "@/app/(main)/create-post/_components/community-search-bar";
import createNewPost from "../_apis/create-new-post";
import SimpleEditor from "./editor";

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
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" fullWidth color="primary" variant="bordered">
          <Tab
            key="media"
            title={
              <div className="flex items-center space-x-2">
                <span>미디어</span>
              </div>
            }
          >
            <DragNDropMediaInput formDispatch={formDispatch} />
          </Tab>
          <Tab
            key="text"
            title={
              <div className="flex items-center space-x-2">
                <span>글</span>
              </div>
            }
          >
            <SimpleEditor formDispatch={formDispatch} />
          </Tab>
          <Tab
            key="link"
            title={
              <div className="flex items-center space-x-2">
                <span>링크</span>
              </div>
            }
          />
        </Tabs>
      </div>

      <div className="w-full flex justify-end gap-2 ">
        <Button
          radius="full"
          variant="light"
          isLoading={isPosting}
          isDisabled={isPosting}
        >
          임시저장
        </Button>
        <Button
          radius="full"
          color="primary"
          type="submit"
          isLoading={isPosting}
          isDisabled={isPosting}
        >
          게시하기
        </Button>
      </div>
    </Form>
  );
}
