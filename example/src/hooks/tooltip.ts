import type {
  ContentPlacementSide,
  WalkthroughMaskCoordinates,
} from "rn-interactive-walkthrough";

export const TOOLTIP_MARGIN = 20;
export const ARROW_WIDTH = 18;
export const ARROW_HEIGHT = 9;

export type TooltipArrow = {
  arrow: "up" | "down";
  arrowLeft: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Resolves the arrow direction and horizontal anchor from the placement. */
export function getTooltipArrow(
  side: ContentPlacementSide,
  mask: WalkthroughMaskCoordinates,
  width: number,
): TooltipArrow {
  const arrow = side === "below" ? "up" : "down";
  const arrowLeft = clamp(
    mask.x + mask.width / 2 - ARROW_WIDTH / 2,
    TOOLTIP_MARGIN,
    width - TOOLTIP_MARGIN - ARROW_WIDTH,
  );
  return { arrow, arrowLeft };
}
