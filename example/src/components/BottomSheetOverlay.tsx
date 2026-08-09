import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ContentComponentProps } from "rn-interactive-walkthrough";

import { colors } from "../theme";
import { OverlayFooter } from "./OverlayFooter";

export type BottomSheetOverlayProps = ContentComponentProps & {
  title: string;
  text: string;
};

export function BottomSheetOverlay({
  title,
  text,
  step,
  ctx: { next, previous, stop, currentStepNumber, steps },
}: BottomSheetOverlayProps) {
  const insets = useSafeAreaInsets();
  const isFirst = steps[0]?.number === step.number;
  const isLast = steps[steps.length - 1]?.number === step.number;
  const stepNumber = currentStepNumber ?? step.number;

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.step}>
            {`STEP ${String(stepNumber)} OF ${String(steps.length)}`}
          </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <OverlayFooter
          next={next}
          previous={previous}
          stop={stop}
          isFirst={isFirst}
          isLast={isLast}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.borderStrong,
    marginBottom: 14,
  },
  header: {
    marginBottom: 6,
  },
  step: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.inkSoft,
  },
});
