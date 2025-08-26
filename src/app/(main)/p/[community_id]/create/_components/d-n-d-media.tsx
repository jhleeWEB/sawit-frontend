"use client";

import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { useState } from "react";
import PreviewCarousel from "@/features/preview-carousel";

export default function DragNDropMediaInput() {
  const [files, setFiles] = useState<[] | { preview: string }[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const urls = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prev) => [...prev, ...urls]);
    },
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            "w-full flex justify-center items-center gap-2 h-[200px] border border-dashed rounded-xl text-gray-500",
        })}
      >
        <input {...getInputProps()} />
        <p>여기에 콘텐츠를 넣거나, 클릭하여 올려보세요.</p>
        <SlCloudUpload size={24} />
      </div>

      {files.length > 0 && <PreviewCarousel files={files} />}
    </>
  );
}
