"use client";

import { useState } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

interface Props {
  text?: string;
}

export default function SimpleEditor({ text }: Props) {
  const [html, setHtml] = useState(() => text || "");

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
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
