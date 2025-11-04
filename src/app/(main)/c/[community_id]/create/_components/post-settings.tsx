"use client";
import { Switch } from "@heroui/react";
import { useState } from "react";

export function PostSettings() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isNFSW, setIsNFSW] = useState(false);
  return (
    <section className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4">
      <h1 className="text-lg font-bold">설정</h1>
      <div className="flex w-full justify-between">
        <h1>노출</h1>
        <Switch
          className="flex-inline flex-row-reverse gap-2"
          size="sm"
          isSelected={isPrivate}
          onValueChange={setIsPrivate}
        >
          {isPrivate ? "비공개" : "공개"}
        </Switch>
      </div>
      <div className="flex w-full justify-between">
        <h1>스포일러</h1>
        <Switch
          className="flex-inline flex-row-reverse gap-2"
          size="sm"
          isSelected={isSpoiler}
          onValueChange={setIsSpoiler}
        >
          {isSpoiler ? "스포" : "일반"}
        </Switch>
      </div>
      <div className="flex w-full justify-between">
        <h1>후방주의</h1>
        <Switch
          className="flex-inline flex-row-reverse gap-2"
          size="sm"
          isSelected={isNFSW}
          onValueChange={setIsNFSW}
        >
          {isNFSW ? "주의" : "비주의"}
        </Switch>
      </div>
    </section>
  );
}
