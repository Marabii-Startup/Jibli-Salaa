"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./store";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
