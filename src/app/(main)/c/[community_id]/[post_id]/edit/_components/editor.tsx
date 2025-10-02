"use client";

import { Dispatch, SetStateAction } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

interface Props {
  text?: string;
  setText: Dispatch<SetStateAction<string | undefined>>;
}

export default function SimpleEditor({ text, setText }: Props) {
  function onChange(e: ContentEditableEvent) {
    setText(e.target.value);
  }
  return (
    <Editor
      placeholder="글쓰기(선택)"
      value={text}
      onChange={onChange}
      className="h-auto min-h-[200px]"
    />
  );
}
