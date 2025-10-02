"use client";

import { ActionDispatch, useState } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

interface Props {
  formDispatch: ActionDispatch<
    [
      action: {
        type: string;
        payload: unknown;
      }
    ]
  >;
}

export default function SimpleEditor({ formDispatch }: Props) {
  const [html, setHtml] = useState("");

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
    formDispatch({ type: "update_text", payload: e.target.value });
  }

  return (
    <Editor
      placeholder="글쓰기(선택)"
      value={html}
      onChange={onChange}
      className="h-auto min-h-[200px]"
    />
  );
}
