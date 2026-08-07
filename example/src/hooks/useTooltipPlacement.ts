import { useSafeAreaFrame } from "react-native-safe-area-context";
import type { IWalkthroughStepMask } from "rn-interactive-walkthrough";

export const TOOLTIP_MARGIN = 20;
export const TOOLTIP_GAP = 12;
export const TOOLTIP_ESTIMATED_HEIGHT = 208;
export const ARROW_WIDTH = 18;
export const ARROW_HEIGHT = 9;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export type TooltipPlacement = {
  top: number;
  arrow: "up" | "down";
  arrowLeft: number;
};

export function useTooltipPlacement(
  mask: IWalkthroughStepMask,
): TooltipPlacement {
  const { width, height } = useSafeAreaFrame();

  const fitsBelow =
    mask.y + mask.height + TOOLTIP_GAP + TOOLTIP_ESTIMATED_HEIGHT < height;
  const top = fitsBelow
    ? mask.y + mask.height + TOOLTIP_GAP
    : Math.max(TOOLTIP_MARGIN, mask.y - TOOLTIP_GAP - TOOLTIP_ESTIMATED_HEIGHT);
  const arrow = fitsBelow ? "up" : "down";
  const arrowLeft = clamp(
    mask.x + mask.width / 2 - ARROW_WIDTH / 2,
    TOOLTIP_MARGIN,
    width - TOOLTIP_MARGIN - ARROW_WIDTH,
  );

  return { top, arrow, arrowLeft };
}
