"use client";
import { Button, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TRANSITION = "transform 200ms ease-in-out";

interface Props {
  files: { preview: string }[];
}

export default function PreviewCarousel({ files }: Props) {
  const wrappeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transition, setTransition] = useState("");

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const next = useCallback(() => {
    const length = files.length - 1;
    if (currentIndex < length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex, files]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex]);

  /** handle side effects of current index */
  useEffect(() => {
    const length = files.length - 1;

    if (currentIndex >= length) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }

    if (currentIndex === 0) {
      setHasPrev(false);
    } else {
      setHasPrev(true);
    }
  }, [files, currentIndex]);

  useEffect(() => {
    setCurrentIndex(files.length - 1);
  }, [files]);

  return (
    <div
      ref={wrappeRef}
      className="relative h-[300px] flex w-full overflow-hidden scrollbar-hide rounded-lg"
    >
      {hasPrev && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute z-10 top-[calc(50%-24px)] left-[38px] rounded-full opacity-70 bg-slate-950"
          size="lg"
          onPress={prev}
        >
          <FaChevronLeft size={24} color="white" />
        </Button>
      )}
      {hasNext && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute z-10 top-[calc(50%-24px)] right-[38px] rounded-full opacity-70 bg-slate-950"
          size="lg"
          onPress={next}
        >
          <FaChevronRight size={24} color="white" />
        </Button>
      )}
      {files.map((n, i) => {
        return (
          <Link
            key={n + "_" + i}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `${transition}`,
              /**@ts-expect-error custom property */
              "--image-url": `url(${n.preview})`,
            }}
            className={`rounded-xl min-w-full border bg-[image:var(--image-url)] bg-cover bg-center`}
          >
            <div className="absolute top-0 left-0 flex justify-center min-w-full bg-white/60 backdrop-blur-3xl">
              <Image
                alt={"event-images" + i}
                height={300}
                src={n.preview}
                radius="none"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
