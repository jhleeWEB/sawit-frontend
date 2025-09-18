"use client";

import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { ActionDispatch, useCallback, useEffect, useState } from "react";
import PreviewCarousel from "@/features/preview-carousel";
import { compressImageToMaxBytes } from "@/utils/image-compression/compress-image-to-max-bytes";
import { MB } from "@/utils/image-compression/types";
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
}

export default function DragNDropMediaInput({ formDispatch }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      let count = 0;
      setIsUploading(true);
      setUploadStatus(`이미지 업로드 시작...(${count}/${accepted.length})`);
      for (const originalFile of accepted) {
        try {
          let file = originalFile;
          const fileName = originalFile.name;
          //파일 사이즈 및 타입 체크
          const isImage = originalFile.type.startsWith("image/");
          const isTooBig = originalFile.size >= 10 * MB;
          if (isImage) {
            if (isTooBig) {
              setUploadStatus(
                `이미지 사이즈 축소 시작...(${fileName})[${count}/${accepted.length}]`
              );
              file = await compressImageToMaxBytes(file, { maxBytes: 10 * MB });
            }
            const url = URL.createObjectURL(file);
            setPreviewUrls((prev) => [...prev, url]);
            setFiles((prev) => [...prev, file]);
            setIsUploading(false);

            setUploadStatus(
              `이미지 업로드 완료...(${fileName})[${count}/${accepted.length}]`
            );
          } else {
            //비디오 처리
          }
        } catch {}
        count += 1;
        setIsUploading(false);
      }
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
      type: "update_files",
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

      {previewUrls.length > 0 && (
        <PreviewCarousel
          urls={previewUrls}
          onRemove={handleRemoveFile}
          getInputProps={getInputProps}
        />
      )}
    </>
  );
}
