"use client";
import { Switch } from "@heroui/react";
import { usePostFormDispatch, usePostFormState } from "./form-provider";

export function PostSettings() {
  const dispatch = usePostFormDispatch();
  const state = usePostFormState();
  return (
    <section className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4">
      <h1 className="text-lg font-bold">설정</h1>
      <div className="flex w-full justify-between">
        <h1>노출</h1>
        <Switch
          className="flex-inline flex-row-reverse gap-2"
          size="sm"
          isSelected={state.isPrivate}
          onValueChange={(isSelected: boolean) =>
            dispatch({ type: "update_is_private", payload: isSelected })
          }
        >
          {state.isPrivate ? "비공개" : "공개"}
        </Switch>
      </div>
      <div className="flex w-full justify-between">
        <h1>스포일러</h1>
        <Switch
          className="flex-inline flex-row-reverse gap-2"
          size="sm"
          isSelected={state.isSpoiler}
          onValueChange={(isSelected: boolean) =>
            dispatch({ type: "update_is_spoiler", payload: isSelected })
          }
        >
          {state.isSpoiler ? "스포" : "일반"}
        </Switch>
      </div>
      <div className="flex w-full justify-between">
        <h1>후방주의</h1>
        <Switch
          className="flex-inline flex-row-reverse gap-2"
          size="sm"
          isSelected={state.isNSFW}
          onValueChange={(isSelected: boolean) =>
            dispatch({ type: "update_is_nsfw", payload: isSelected })
          }
        >
          {state.isNSFW ? "주의" : "비주의"}
        </Switch>
      </div>
    </section>
  );
}
