import { createContext, useContext } from "react";

import type { WalkthroughContextType } from "./types";

export const WalkthroughContext = createContext<
  WalkthroughContextType | undefined
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
