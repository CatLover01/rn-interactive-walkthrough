import { LinearTransition, FadeIn, FadeOut } from "react-native-reanimated";

import type { WalkthroughLayoutAnimations } from "./types";

export const getDefaultAnimations = (
  transitionDuration: number,
): WalkthroughLayoutAnimations => ({
  backdrop: {
    entering: FadeIn.duration(transitionDuration),
    exiting: FadeOut.duration(transitionDuration),
    layout: LinearTransition.duration(transitionDuration),
  },
  content: {
    entering: FadeIn.duration(transitionDuration),
    exiting: FadeOut.duration(transitionDuration),
    layout: LinearTransition.duration(transitionDuration),
  },
});

export const getAnimations = (
  userAnimations: Partial<WalkthroughLayoutAnimations> | undefined,
  transitionDuration: number,
): WalkthroughLayoutAnimations => {
  const { backdrop, content } = getDefaultAnimations(transitionDuration);
  return {
    backdrop: { ...backdrop, ...userAnimations?.backdrop },
    content: { ...content, ...userAnimations?.content },
  };
};

export const defaultUseIsFocused = () => true;
