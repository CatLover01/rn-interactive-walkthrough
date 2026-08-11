import { useCallback, useMemo, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import type { WalkthroughMaskCoordinates } from "../types";

/** Whether the content ended up above or below the mask. */
export type ContentPlacementSide = "above" | "below";

/** Options for {@link useContentPlacement}. */
export type ContentPlacementOptions = {
  /** Minimum distance between the content and the mask. Defaults to `12`. */
  gap?: number;
  /**
   * Minimum distance between the content and the safe-area edges (top and
   * bottom bars are excluded from the up/down decision). Defaults to `20`.
   * */
  margin?: number;
};

/** The result of {@link useContentPlacement}. */
export type ContentPlacement = {
  /**
   * Attach this to the content's `onLayout` so the hook can measure its real
   * size before deciding where to place it.
   * */
  onLayout: (event: LayoutChangeEvent) => void;
  /** The final distance from the top of the screen, inside the safe area. */
  top: number;
  /** Whether the content landed above or below the mask. */
  side: ContentPlacementSide;
  /**
   * `false` until the content has been measured and placed. Keep the content
   * hidden (e.g. `opacity: 0`) until this flips to `true` so it never renders
   * at its provisional position.
   * */
  ready: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Positions content (like a tooltip) relative to a mask while keeping it
 * entirely inside the safe area.
 *
 * The mask coordinates must be relative to the same frame as
 * react-native-safe-area-context (e.g. as measured by
 * {@link useWalkthroughStep}). The hook measures the content's real size via
 * {@link ContentPlacement.onLayout}, then decides whether it fits below the
 * mask or has to flip above it. Unsafe areas are excluded from that decision:
 * a bottom bar or top bar is never counted as usable space, and the final
 * {@link ContentPlacement.top} is clamped so the whole content stays within
 * the safe frame. The up/down choice is only used for measuring; the placed
 * position always respects the safe area.
 *
 * @param mask The mask to position the content against.
 * @param options Gap and safe-area margin. See {@link ContentPlacementOptions}.
 * */
export const useContentPlacement = (
  mask: WalkthroughMaskCoordinates,
  { gap = 12, margin = 20 }: ContentPlacementOptions = {},
): ContentPlacement => {
  const { height: frameHeight } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const [height, setHeight] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  }, []);

  const placement = useMemo(() => {
    if (height <= 0) {
      return { top: 0, side: "below" as const, ready: false };
    }

    const safeTop = insets.top + margin;
    const safeBottom = frameHeight - insets.bottom - margin;
    const maskBottom = mask.y + mask.height;

    const fitsBelow = maskBottom + gap + height <= safeBottom;
    const side: ContentPlacementSide = fitsBelow ? "below" : "above";
    const rawTop = fitsBelow ? maskBottom + gap : mask.y - gap - height;
    const top = clamp(rawTop, safeTop, safeBottom - height);

    return { top, side, ready: true };
  }, [mask, height, frameHeight, insets.top, insets.bottom, gap, margin]);

  return {
    onLayout,
    top: placement.top,
    side: placement.side,
    ready: placement.ready,
  };
};
