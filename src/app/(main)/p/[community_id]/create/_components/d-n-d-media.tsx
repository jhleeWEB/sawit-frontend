"use client";

import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { ActionDispatch, useEffect, useState } from "react";
import PreviewCarousel from "@/features/preview-carousel";

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

export default function DragNDropMediaInput({ formDispatch }: Props) {
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

  const handleRemoveFile = (index: number) => {
    const removed = [...files];
    removed.splice(index, 1);
    setFiles(removed);
  };

  useEffect(() => {
    formDispatch({ type: "update_files", payload: files });
  }, [files, formDispatch]);

  return (
    <>
      {files.length === 0 ? (
        <div
          {...getRootProps({
            className:
              "w-full flex justify-center items-center gap-2 h-[200px] border border-dashed rounded-xl text-gray-500",
          })}
        >
          <input {...getInputProps()} name="files" />

          <>
            <p>여기에 콘텐츠를 넣거나, 클릭하여 올려보세요.</p>
            <SlCloudUpload size={24} />
          </>
        </div>
      ) : (
        <label
          htmlFor="upload"
          className="bg-default hover:-brightness-120 p-2 px-4 rounded-full cursor-pointer"
        >
          추가하기
          <input
            name="files"
            {...getInputProps()}
            id="upload"
            type="file"
            style={{ display: "none" }}
          />
        </label>
      )}

      {files.length > 0 && (
        <PreviewCarousel files={files} onRemove={handleRemoveFile} />
      )}
    </>
  );
}
