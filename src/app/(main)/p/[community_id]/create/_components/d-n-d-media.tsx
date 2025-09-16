"use client";

import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { ActionDispatch, useCallback, useEffect, useState } from "react";
import PreviewCarousel from "@/features/preview-carousel";
import { compressImageToMaxBytes } from "@/utils/image-compression/compress-image-to-max-bytes";
import { MB } from "@/utils/image-compression/types";
import uploadDraftFiles, {
  DraftPreviewFile,
} from "@/service/upload-draft-files";
import { Spinner } from "@heroui/react";

interface Props {
  formDispatch: ActionDispatch<
    [
      action: {
        type: string;
        payload: unknown;
      }
    ]
  >;
  draftFiles?: { preview: string; file: File }[];
}

export default function DragNDropMediaInput({ formDispatch }: Props) {
  const [files, setFiles] = useState<DraftPreviewFile[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      setIsUploading(true);
      setUploadStatus("이미지 업로드 시작");
      await Promise.all(
        accepted.map(async (f) => {
          // 이미지만 압축; 그 외 파일은 그대로
          if (f.type.startsWith("image/")) {
            try {
              setUploadStatus("이미지 최적화");
              const file = await compressImageToMaxBytes(f, {
                maxBytes: 10 * MB,
              });
              setUploadStatus("이미지 업로드");
              const upload = await uploadDraftFiles(file);
              if (upload) {
                setFiles((prev) => [...prev, upload]);
                setUploadStatus("이미지 업로드 성공");
              }
            } catch {
              setUploadStatus("이미지 업로드 실패");
            }
          } else if (f.type.startsWith("video/")) {
            //to-do video 나중에 추가
          }
        })
      );
      setIsUploading(false);
    },
    [setUploadStatus, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop,
  });

  const handleRemoveFile = (index: number) => {
    const removed = [...files];
    removed.splice(index, 1);
    setFiles(removed);
  };

  useEffect(() => {
    formDispatch({
      type: "update_draft_files",
      payload: [...files],
    });
  }, [files, formDispatch]);

  return (
    <>
      {isUploading && (
        <div className="flex items-center text-sm text-neutral-400">
          <Spinner /> {uploadStatus}
        </div>
      )}
      {files.length === 0 && (
        <div
          {...getRootProps({
            className:
              "w-full flex justify-center items-center gap-2 h-[200px] cursor-pointer border-2 border-dashed rounded-xl text-neutral-500 hover:bg-neutral-100",
          })}
        >
          <input {...getInputProps()} name="files" />

          <>
            <p>여기에 콘텐츠를 넣거나, 클릭하여 올려보세요.</p>
            <SlCloudUpload size={24} />
          </>
        </div>
      )}

      {files.length > 0 && (
        <PreviewCarousel
          urls={files.map((n) => n.signedUrl)}
          onRemove={handleRemoveFile}
          getInputProps={getInputProps}
        />
      )}
    </>
  );
}
