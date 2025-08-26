"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

export default function EditorWrapper() {
  return (
    <div className="relative w-full">
      <Editor height="300px" initialEditType="wysiwyg" />
    </div>
  );
}
