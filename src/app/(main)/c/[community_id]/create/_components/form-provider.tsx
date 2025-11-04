"use client";
import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export interface FormState {
  communityId: number | undefined;
  title: string;
  files: File[] | [];
  text: string;
  isUploading: boolean;
  isPrivate: boolean;
  isSpoiler: boolean;
  isNSFW: boolean;
  uploadType: "none" | "video" | "image" | string;
}

function reducer(state: FormState, action: Action) {
  switch (action.type) {
    case "update_files":
      return { ...state, files: [...action.payload] };
    case "update_text":
      return { ...state, text: action.payload };
    case "update_title":
      return { ...state, title: action.payload };
    case "update_community_id":
      return { ...state, communityId: action.payload };
    case "update_is_uploading":
      return { ...state, isUploading: action.payload };
    case "update_upload_type":
      return { ...state, uploadType: action.payload };
    case "update_is_private":
      return { ...state, isPrivate: action.payload };
    case "update_is_spoiler":
      return { ...state, isSpoiler: action.payload };
    case "update_is_nsfw":
      return { ...state, isNSFW: action.payload };
  }
  return state;
}
export type Action =
  | { type: "update_files"; payload: File[] }
  | { type: "update_text"; payload: string }
  | { type: "update_title"; payload: string }
  | { type: "update_community_id"; payload: number }
  | { type: "update_is_uploading"; payload: boolean }
  | { type: "update_upload_type"; payload: string }
  | { type: "update_is_private"; payload: boolean }
  | { type: "update_is_spoiler"; payload: boolean }
  | { type: "update_is_nsfw"; payload: boolean };

const StateCtx = createContext<FormState | undefined>(undefined);
const DispatchCtx = createContext<ActionDispatch<[Action]> | undefined>(
  undefined,
);

export function usePostFormState() {
  const context = useContext(StateCtx);
  if (!context)
    throw new Error("usePostFormState must be used within <FormProvider>");
  return context;
}
export function usePostFormDispatch() {
  const context = useContext(DispatchCtx);
  if (!context)
    throw new Error("usePostFormDispatch must be used within <FormProvider>");
  return context;
}

const initialState = {
  communityId: undefined,
  title: "",
  files: [],
  text: "",
  isUploading: false,
  isPrivate: false,
  isSpoiler: false,
  isNSFW: false,
  uploadType: "none",
};
export default function PostFormProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}
