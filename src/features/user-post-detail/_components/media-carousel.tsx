"use client";
import { Button, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TRANSITION = "transform 200ms ease-in-out";
interface Props {
  urls: string[];
}

export default function MediaCarousel({ urls }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState("");

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const next = useCallback(() => {
    const length = urls.length - 1;
    if (currentIndex < length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex, urls]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex]);

  /** handle side effects of current index */
  useEffect(() => {
    const length = urls.length - 1;

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
  }, [urls, currentIndex]);

  return (
    <div
      className={`relative w-full h-auto max-h-[60vh] flex items-center overflow-x-hidden scrollbar-hide rounded-lg`}
    >
      {hasPrev && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute z-10 top-[calc(50%-24px)] left-[18px] rounded-full opacity-70 bg-black/50"
          size="sm"
          onPress={prev}
        >
          <FaChevronLeft size={18} color="white" />
        </Button>
      )}
      {hasNext && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute z-10 top-[calc(50%-24px)] right-[18px] rounded-full bg-black/50"
          size="sm"
          onPress={next}
        >
          <FaChevronRight size={18} color="white" />
        </Button>
      )}
      {urls.map((url, i) => {
        return (
          <div
            key={url + "_" + i}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `${transition}`,
              backgroundImage: `url("${url}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "-webkit-fill-available",
            }}
            className={`relative flex justify-center items-center rounded-xl min-w-full h-full border-2 hover:none`}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-xl rounded-lg" />
            <Image
              alt={"event-images" + i}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "60vh",
              }}
              src={url}
              radius="none"
            />
          </div>
        );
      })}
    </div>
  );
}
