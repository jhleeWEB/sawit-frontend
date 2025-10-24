"use client";
import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export interface CommunityFormState {
  name: string;
  description: string;
  backgroundColor?: string;
  topics: string[] | [];
  banner: Blob | undefined;
  icon: Blob | undefined;
  bannerPreview: string;
  iconPreview: string;
  isLoading: boolean;
}

function reducer(state: CommunityFormState, action: Action) {
  switch (action.type) {
    case "update_banner":
      return { ...state, banner: action.payload };
    case "update_icon":
      return { ...state, icon: action.payload };
    case "update_banner_preview":
      return { ...state, bannerPreview: action.payload };
    case "update_icon_preview":
      return { ...state, iconPreview: action.payload };
    case "update_name":
      return { ...state, name: action.payload };
    case "update_description":
      return { ...state, description: action.payload };
    case "update_topics":
      return { ...state, topics: [...action.payload] };
    case "update_background_color":
      return { ...state, backgroundColor: action.payload };
    case "buzy":
      return { ...state, isLoading: true };
    case "idle":
      return { ...state, isLoading: false };
  }
  return state;
}
export type Action =
  | { type: "update_banner"; payload: Blob }
  | { type: "update_icon"; payload: Blob }
  | { type: "update_banner_preview"; payload: string }
  | { type: "update_icon_preview"; payload: string }
  | { type: "update_background_color"; payload: string }
  | { type: "update_name"; payload: string }
  | { type: "update_description"; payload: string }
  | { type: "update_topics"; payload: string[] }
  | { type: "buzy" }
  | { type: "idle" };

const StateCtx = createContext<CommunityFormState | undefined>(undefined);
const DispatchCtx = createContext<ActionDispatch<[Action]> | undefined>(
  undefined,
);

export function useCommunityFormState() {
  const context = useContext(StateCtx);
  if (!context)
    throw new Error(
      "useCommunityFormState must be used within <CommunityFormProvider>",
    );
  return context;
}
export function useCommunityFormDispatch() {
  const context = useContext(DispatchCtx);
  if (!context)
    throw new Error(
      "useCommunityFormDispatch must be used within <CommunityFormProvider>",
    );
  return context;
}

const defaultState = {
  name: "",
  description: "",
  topics: [],
  banner: undefined,
  icon: undefined,
  bannerPreview: "",
  iconPreview: "",
  isLoading: false,
};

interface CommunityFormProviderProps extends PropsWithChildren {
  initialState?: CommunityFormState;
}

export default function CommunityFormProvider({
  initialState,
  children,
}: CommunityFormProviderProps) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState ? initialState : defaultState,
  );
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}
