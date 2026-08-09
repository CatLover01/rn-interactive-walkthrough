import {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

import type {
  OnPressWithContextType,
  PartialWalkthroughLayoutAnimations,
  WalkthroughContextType,
  WalkthroughLayoutAnimations,
  WalkthroughMaskCoordinates,
  WalkthroughStepMask,
} from "./types";

export const getDefaultAnimations = (
  duration: number,
): WalkthroughLayoutAnimations => ({
  backdrop: {
    entering: FadeIn.duration(duration),
    exiting: FadeOut.duration(duration),
    easing: Easing.elastic(0.7),
  },
  content: {
    entering: FadeIn.duration(duration),
    exiting: FadeOut.duration(duration),
    layout: LinearTransition.duration(duration),
  },
});

export const getMergedAnimations = (
  animations: PartialWalkthroughLayoutAnimations | undefined,
  duration: number,
): WalkthroughLayoutAnimations => {
  const { backdrop, content } = getDefaultAnimations(duration);
  return {
    backdrop: { ...backdrop, ...animations?.backdrop },
    content: { ...content, ...animations?.content },
  };
};

export const defaultUseIsFocused = () => true;

export const toCoordinates = (
  mask: WalkthroughStepMask,
): WalkthroughMaskCoordinates => ({
  x: mask.x,
  y: mask.y,
  width: mask.width,
  height: mask.height,
});

export const handlePress = (
  handler: OnPressWithContextType | undefined,
  context: WalkthroughContextType,
) =>
  handler
    ? () => {
        handler(context);
      }
    : undefined;
