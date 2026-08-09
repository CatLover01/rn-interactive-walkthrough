import { StyleSheet, Text, View } from "react-native";
import type { ContentComponentProps } from "rn-interactive-walkthrough";

import {
  ARROW_HEIGHT,
  ARROW_WIDTH,
  TOOLTIP_MARGIN,
  useTooltipPlacement,
} from "../hooks/useTooltipPlacement";
import { colors } from "../theme";
import { OverlayFooter } from "./OverlayFooter";

export type ThemedTooltipProps = ContentComponentProps & {
  title: string;
  text: string;
};

export function ThemedTooltip({
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
}: ThemedTooltipProps) {
  const mask = step.computedMask ?? step.mask;
  const { top, arrow, arrowLeft } = useTooltipPlacement(mask);
  const stepNumber = currentStepNumber ?? step.number;

  return (
    <View
      style={[
        styles.card,
        { left: TOOLTIP_MARGIN, right: TOOLTIP_MARGIN, top },
      ]}
    >
      <View
        style={[
          styles.arrow,
          arrow === "up" ? styles.arrowUp : styles.arrowDown,
          { left: arrowLeft },
        ]}
      />
      <Text style={styles.step}>
        {`STEP ${String(stepNumber)} OF ${String(steps.length)}`}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <OverlayFooter
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
  card: {
    position: "absolute",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
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
    borderBottomColor: colors.surface,
  },
  arrowDown: {
    bottom: -ARROW_HEIGHT,
    borderLeftWidth: ARROW_WIDTH / 2,
    borderRightWidth: ARROW_WIDTH / 2,
    borderTopWidth: ARROW_HEIGHT,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.surface,
  },
  step: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  text: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 20,
  },
});
