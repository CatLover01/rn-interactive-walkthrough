import { StyleSheet, Text, View } from "react-native";
import type { IOverlayComponentProps } from "rn-interactive-walkthrough";

import { colors } from "../theme";
import { OverlayFooter } from "./OverlayFooter";

export type CenterCardOverlayProps = IOverlayComponentProps & {
  title: string;
  text: string;
};

export function CenterCardOverlay({
  title,
  text,
  next,
  previous,
  stop,
  currentStepNumber,
  steps,
  step,
}: CenterCardOverlayProps) {
  const isFirst = steps[0]?.number === step.number;
  const isLast = steps[steps.length - 1]?.number === step.number;
  const stepNumber = currentStepNumber ?? step.number;

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.card}>
        <Text style={styles.step}>
          {`STEP ${String(stepNumber)} OF ${String(steps.length)}`}
        </Text>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 16,
  },
  step: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 19,
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
