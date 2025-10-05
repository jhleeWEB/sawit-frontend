"use client";

import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { ActionDispatch, useCallback, useEffect, useState } from "react";
import PreviewCarousel from "@/features/preview-carousel";
import { compressImageToMaxBytes } from "@/utils/image-compression/compress-image-to-max-bytes";
import { Progress, Spinner } from "@heroui/react";
import { MB } from "@/utils/consts";
import { getFFmpeg } from "@/utils/video-compression/load-ffmpeg-core";
import { transcodeToTarget } from "@/utils/video-compression/transcode-to-target";
import useVideoCompression from "../_hooks/use-video-compression";
import { percent, stagger } from "framer-motion";

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
  const { start, stage, percent } = useVideoCompression();

  const onDrop = useCallback(
    async (accepted: File[]) => {
      let count = 0;
      setIsUploading(true);
      setUploadStatus(`이미지 업로드 시작...(${count}/${accepted.length})`);
      for (const originalFile of accepted) {
        let file = originalFile;
        const fileName = originalFile.name;
        //파일 사이즈 및 타입 체크
        const isImage = originalFile.type.startsWith("image/");
        if (isImage) {
          const isTooBig = originalFile.size >= (10 * MB) / accepted.length;
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
        }
        const isVideo = originalFile.type.startsWith("video/");
        if (isVideo) {
          const targetSize = (50 * MB) / accepted.length;
          const isTooBig = originalFile.size >= targetSize;
          console.log("original size:", originalFile.size / MB, "MB");
          let outVideo = originalFile;
          if (isTooBig) {
            outVideo = await start(outVideo, targetSize);
          }
          console.log("output size: ", outVideo.size / MB, "MB");

          const url = URL.createObjectURL(outVideo);
          setFiles((prev) => [...prev, outVideo]);
          setPreviewUrls((prev) => [...prev, url]);
          setIsUploading(false);
          setUploadStatus(
            `이미지 업로드 완료...(${fileName})[${count}/${accepted.length}]`
          );
        }

        count += 1;
        setIsUploading(false);
      }
      setIsUploading(false);
    },
    [setUploadStatus, setFiles, start]
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
        <div className="flex w-full items-center text-sm text-neutral-400 mb-4">
          <Progress
            aria-label="video-optimize"
            showValueLabel={true}
            value={percent}
            color={percent < 100 ? "primary" : "success"}
            label={stage}
            maxValue={100}
            formatOptions={{ style: "percent" }}
            isStriped
          />
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
          previews={previewUrls.map((n, i) => ({
            url: n,
            type: files[i].type.startsWith("image/") ? "image" : "video",
          }))}
          onRemove={handleRemoveFile}
          getInputProps={getInputProps}
        />
      )}
    </>
  );
}
