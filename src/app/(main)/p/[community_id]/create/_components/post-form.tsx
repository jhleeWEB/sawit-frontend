"use client";
import { Button, Form, Input } from "@heroui/react";
import DragNDropMediaInput from "./d-n-d-media";
import EditorWrapper from "./editor";
import { FormEvent, useReducer } from "react";

function reducer(state: FormState, action: { type: string; payload: never }) {
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
  }
  return state;
}

interface FormState {
  title: string;
  files: File[] | [];
  text: string;
}

const initialState = {
  title: "",
  files: [],
  text: "",
};

export default function PostForm() {
  const [formState, formDispatch] = useReducer(reducer, initialState);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("files"));
  };
  return (
    <Form
      onSubmit={handleSubmit}
      id="community-post-form"
      className="flex flex-col gap-16"
    >
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
    </Form>
  );
}
