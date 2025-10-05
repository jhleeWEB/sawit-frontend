"use client";
import {
  ActionDispatch,
  AnyActionArg,
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useReducer,
} from "react";

export interface FormState {
  communityId: number | undefined;
  title: string;
  files: File[] | [];
  text: string;
}
//@ts-expect-error payload any type
function reducer(state: FormState, action: Action) {
  switch (action.type) {
    case "update_files":
      state.files = [...action.payload];
      return state;
    case "update_text":
      state.text = action.payload;
      return state;
    case "update_title":
      state.title = action.payload;
      return state;
    case "update_community_id":
      return { ...state, communityId: action.payload };
  }
  return state;
}
export type Action =
  | { type: "update_files"; payload: File[] }
  | { type: "update_text"; payload: string }
  | { type: "update_title"; payload: string }
  | { type: "update_community_id"; payload: number };

const StateCtx = createContext<FormState | undefined>(undefined);
const DispatchCtx = createContext<ActionDispatch<[Action]> | undefined>(
  undefined
);

const initialState = {
  communityId: undefined,
  title: "",
  files: [],
  text: "",
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
