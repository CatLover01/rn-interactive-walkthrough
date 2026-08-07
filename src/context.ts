import { createContext, useContext } from "react";

import type { IWalkthroughContext } from "./types";

export const WalkthroughContext = createContext<
  IWalkthroughContext | undefined
>(undefined);

export const useWalkthrough = () => {
  const context = useContext(WalkthroughContext);
  if (context === undefined) {
    throw new Error(
      "Make sure that this is called as a child of WalkthroughProvider.",
    );
  }
  return context;
};
