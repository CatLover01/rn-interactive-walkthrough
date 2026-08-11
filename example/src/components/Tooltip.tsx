import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import {
  useContentPlacement,
  type ContentComponentProps,
} from "rn-interactive-walkthrough";

import {
  ARROW_HEIGHT,
  ARROW_WIDTH,
  TOOLTIP_MARGIN,
  getTooltipArrow,
} from "../hooks/tooltip";
import { colors } from "../theme";
import { OverlayFooter } from "./OverlayFooter";

export type TooltipProps = ContentComponentProps & {
  title: string;
  text: string;
};

export function Tooltip({
  step,
  title,
  text,
  ctx: {
    next,
    previous,
    stop,
    currentStepNumber,
    steps,
    isFirstStep,
    isLastStep,
  },
}: TooltipProps) {
  const mask = step.computedMask ?? step.mask;
  const { onLayout, top, side, ready } = useContentPlacement(mask);
  const { width } = useSafeAreaFrame();
  const { arrow, arrowLeft } = getTooltipArrow(side, mask, width);
  const stepNumber = currentStepNumber ?? step.number;

  return (
    <View
      onLayout={onLayout}
      pointerEvents={ready ? "auto" : "none"}
      style={[
        styles.card,
        { left: TOOLTIP_MARGIN, right: TOOLTIP_MARGIN, top },
        !ready && styles.hidden,
      ]}
    >
      <View
        style={[
          styles.arrow,
          arrow === "up" ? styles.arrowUp : styles.arrowDown,
          { left: arrowLeft },
        ]}
      />
      <View style={styles.header}>
        <Text style={styles.step}>
          {`STEP ${String(stepNumber)} OF ${String(steps.length)}`}
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <OverlayFooter
        tone="dark"
        next={next}
        previous={previous}
        stop={stop}
        isFirst={isFirstStep}
        isLast={isLastStep}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
  card: {
    position: "absolute",
    backgroundColor: colors.tooltipBg,
    borderRadius: 16,
    padding: 18,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 12,
        blurRadius: 24,
        spreadDistance: 0,
        color: "rgba(0, 0, 0, 0.3)",
      },
    ],
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
  },
  arrowUp: {
    top: -ARROW_HEIGHT,
    borderLeftWidth: ARROW_WIDTH / 2,
    borderRightWidth: ARROW_WIDTH / 2,
    borderBottomWidth: ARROW_HEIGHT,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.tooltipBg,
  },
  arrowDown: {
    bottom: -ARROW_HEIGHT,
    borderLeftWidth: ARROW_WIDTH / 2,
    borderRightWidth: ARROW_WIDTH / 2,
    borderTopWidth: ARROW_HEIGHT,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.tooltipBg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  step: {
    color: colors.tooltipAccent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    color: colors.tooltipInk,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  text: {
    color: colors.tooltipMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
