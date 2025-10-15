"use client";

import { useState } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import { usePostFormDispatch } from "./form-provider";

export default function SimpleEditor() {
  const formDispatch = usePostFormDispatch();
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
