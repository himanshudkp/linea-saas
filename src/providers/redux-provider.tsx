"use client";

import { makeStore, RootState } from "@/store";
import { useRef, type ReactNode } from "react";
import { Provider } from "react-redux";

export const ReduxProvider = ({
  children,
  preloadedState,
}: {
  children: ReactNode;
  preloadedState: Partial<RootState>;
}) => {
  const storeRef = useRef(makeStore(preloadedState));

  return <Provider store={storeRef.current}>{children}</Provider>;
};
