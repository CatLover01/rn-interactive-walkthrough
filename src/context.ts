import { createContext, useContext } from "react";

import type { WalkthroughContextType } from "./types";

export const WalkthroughContext = createContext<
  WalkthroughContextType | undefined
>(undefined);

/**
 * Returns the walkthrough context, see {@link WalkthroughContextType}.
 *
 * Must be called within a {@link WalkthroughProvider}, otherwise it throws.
 * Use it to read the current step and to drive the walkthrough from your own
 * code (start, stop, next, previous, goTo).
 * */
export const useWalkthrough = () => {
  const context = useContext(WalkthroughContext);
  if (context === undefined) {
    throw new Error(
      "Make sure that this is called as a child of WalkthroughProvider.",
    );
  }
  return context;
};
