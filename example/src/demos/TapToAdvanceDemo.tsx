import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWalkthroughStep } from "rn-interactive-walkthrough";

import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";
import { Tooltip } from "../components/Tooltip";
import { colors } from "../theme";

export function TapToAdvanceScreen() {
  const step1 = useWalkthroughStep({
    number: 1,
    layoutAdjustments: { addPadding: 8 },
    onPressMask: (ctx) => ctx?.next(),
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "Tap the target to continue",
      text: "The whole highlighted button acts as the Next button. Tapping the dim area stops the tour.",
    },
  });

  const step2 = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 8 },
    onPressMask: (ctx) => ctx?.next(),
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "Same handlers, new target",
      text: "onPressMask and onPressBackdrop work on every step, so the pattern scales.",
    },
  });

  useWalkthroughStep({
    number: 3,
    fullScreen: true,
    OverlayComponent: FullScreenCard,
    overlayComponentProps: {
      title: "Taps drive the tour",
      text: "Use the handlers to build tours that feel like part of the app.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Tap to advance</Text>
        <Text style={styles.introText}>
          No tooltip buttons needed here. Tap the highlighted button to move on,
          tap the dim area to stop.
        </Text>
        <StartDemoButton />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          The call to action below is wired up to the walkthrough, so give it a
          tap when the tour is running.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => {}}
          onLayout={step1.onLayout}
          style={({ pressed }) => [
            styles.primary,
            pressed && styles.primaryPressed,
          ]}
        >
          <Text style={styles.primaryText}>Continue</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Secondary actions work the same way. The tooltip still shows the
          progress.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => {}}
          onLayout={step2.onLayout}
          style={({ pressed }) => [
            styles.secondary,
            pressed && styles.secondaryPressed,
          ]}
        >
          <Text style={styles.secondaryText}>Learn more</Text>
        </Pressable>
      </View>

      <Text style={styles.footnote}>
        Both buttons are wired to the walkthrough, but they do nothing when the
        tour is off.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
    gap: 14,
  },
  intro: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 10,
    marginBottom: 4,
  },
  introTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.ink,
  },
  introText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkSoft,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 14,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkSoft,
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed,
  },
  primaryText: {
    color: colors.onAccent,
    fontSize: 15,
    fontWeight: "700",
  },
  secondary: {
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  secondaryPressed: {
    backgroundColor: colors.accentSoft,
  },
  secondaryText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: "700",
  },
  footnote: {
    textAlign: "center",
    fontSize: 12,
    color: colors.inkFaint,
  },
});
