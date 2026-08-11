import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import type { ContentComponentProps } from "rn-interactive-walkthrough";

import { TOOLTIP_MARGIN } from "../hooks/tooltip";
import { colors } from "../theme";

const PILL_WIDTH = 210;
const GAP = 10;

export type CalloutPillProps = ContentComponentProps & {
  text: string;
};

export function CalloutPill({
  step,
  text,
  ctx: { next, stop, isLastStep },
}: CalloutPillProps) {
  const { width } = useSafeAreaFrame();
  const mask = step.computedMask ?? step.mask;

  const fitsRight =
    mask.x + mask.width + GAP + PILL_WIDTH < width - TOOLTIP_MARGIN;
  const left = fitsRight ? mask.x + mask.width + GAP : TOOLTIP_MARGIN;
  const top = fitsRight ? mask.y : mask.y + mask.height + GAP;

  return (
    <View style={[styles.pill, { left, top, width: PILL_WIDTH }]}>
      <View style={[styles.dot, fitsRight ? styles.dotLeft : styles.dotTop]} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={isLastStep ? stop : next}
          style={({ pressed }) => [styles.next, pressed && styles.nextPressed]}
        >
          <Text style={styles.nextText}>{isLastStep ? "Done" : "Next"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: "absolute",
    backgroundColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 6,
        blurRadius: 14,
        spreadDistance: 0,
        color: "rgba(0, 0, 0, 0.2)",
      },
    ],
  },
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.ink,
  },
  dotLeft: {
    left: -5,
    top: 20,
  },
  dotTop: {
    top: -5,
    left: 24,
  },
  text: {
    color: colors.tooltipInk,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  next: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  nextPressed: {
    backgroundColor: colors.accentPressed,
  },
  nextText: {
    color: colors.onAccent,
    fontSize: 13,
    fontWeight: "700",
  },
});
