"use client";

import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import {
  ActionDispatch,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PreviewCarousel from "@/features/preview-carousel";
import { Progress } from "@heroui/react";
import { MB } from "@/utils/consts";

import useVideoCompression from "../_hooks/use-video-compression";
import useImageCompression from "../_hooks/use-image-compression";

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
  const {
    start: startVideoCompression,
    stage: videoStage,
    percent: videoProgression,
  } = useVideoCompression();
  const {
    start: startImageCompression,
    stage: imageStage,
    percent: imageProgression,
  } = useImageCompression();

  const previews = useMemo(() => {
    if (files.length < 1) return [];
    return previewUrls.map((url, i) => ({
      url: url,
      type: files[i].type.startsWith("image/") ? "image" : "video",
    }));
  }, [files, previewUrls]);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      setIsUploading(true);
      for (const originalFile of accepted) {
        let file = originalFile;
        //파일 사이즈 및 타입 체크
        const isImage = originalFile.type.startsWith("image/");
        if (isImage) {
          const isTooBig = originalFile.size >= (10 * MB) / accepted.length;
          if (isTooBig) {
            setUploadStatus("image");
            file = await startImageCompression(file, { maxBytes: 5 * MB });
          }
          const url = URL.createObjectURL(file);
          setPreviewUrls((prev) => [...prev, url]);
          setFiles((prev) => [...prev, file]);
        }
        const isVideo = originalFile.type.startsWith("video/");
        if (isVideo) {
          const targetSize = (50 * MB) / accepted.length;
          const isTooBig = originalFile.size >= targetSize;
          // console.log("original size:", originalFile.size / MB, "MB");
          let outVideo = originalFile;
          if (isTooBig) {
            setUploadStatus("video");
            outVideo = await startVideoCompression(outVideo, targetSize);
          }
          // console.log("output size: ", outVideo.size / MB, "MB");

          const url = URL.createObjectURL(outVideo);
          setFiles((prev) => [...prev, outVideo]);
          setPreviewUrls((prev) => [...prev, url]);
        }
      }
      setUploadStatus("");
      setIsUploading(false);
    },
    [setUploadStatus, setFiles, startVideoCompression, startImageCompression]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop,
  });

  const handleRemoveFile = (index: number) => {
    const removedFiles = [...files];
    removedFiles.splice(index, 1);
    const removedUrls = [...previewUrls];
    removedUrls.splice(index, 1);
    setFiles(removedFiles);
    setPreviewUrls(removedUrls);
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
        <>
          <div className="flex w-full items-center text-sm text-neutral-400 mb-4">
            <Progress
              aria-label="video-optimize"
              showValueLabel={true}
              value={
                uploadStatus === "video" ? videoProgression : imageProgression
              }
              label={uploadStatus === "video" ? videoStage : imageStage}
              maxValue={100}
              formatOptions={{ style: "percent" }}
              isStriped
            />
          </div>
        </>
      )}
      {files.length === 0 && !isUploading && (
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
          previews={previews}
          onRemove={handleRemoveFile}
          getInputProps={getInputProps}
        />
      )}
    </>
  );
}
