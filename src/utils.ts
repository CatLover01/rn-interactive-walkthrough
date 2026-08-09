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
  transitionDuration: number,
): WalkthroughLayoutAnimations => ({
  backdrop: {
    entering: FadeIn.duration(transitionDuration),
    exiting: FadeOut.duration(transitionDuration),
    easing: Easing.elastic(0.7),
  },
  content: {
    entering: FadeIn.duration(transitionDuration),
    exiting: FadeOut.duration(transitionDuration),
    layout: LinearTransition.duration(transitionDuration),
  },
});

export const getAnimations = (
  userAnimations: PartialWalkthroughLayoutAnimations | undefined,
  transitionDuration: number,
): WalkthroughLayoutAnimations => {
  const { backdrop, content } = getDefaultAnimations(transitionDuration);
  return {
    backdrop: { ...backdrop, ...userAnimations?.backdrop },
    content: { ...content, ...userAnimations?.content },
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
