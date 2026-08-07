import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useWalkthrough, useWalkthroughStep } from "rn-interactive-walkthrough";

import { colors } from "../theme";
import { Tooltip } from "../components/Tooltip";
import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";

const BACKDROP_OPTIONS = [
  { label: "Dark", value: "rgba(24, 21, 15, 0.86)" },
  { label: "Blue", value: "rgba(21, 35, 56, 0.88)" },
  { label: "Warm", value: "rgba(43, 24, 12, 0.86)" },
];

const DURATION_OPTIONS = [200, 500, 800];

function ControlPanel() {
  const {
    goTo,
    stop,
    backdropColor,
    setBackdropColor,
    transitionDuration,
    setTransitionDuration,
  } = useWalkthrough();

  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Drive the tour from anywhere</Text>
      <Text style={styles.panelText}>
        These controls use the walkthrough context, not the tooltips.
      </Text>

      <View style={styles.buttonRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            goTo(1);
          }}
          style={({ pressed }) => [
            styles.panelButton,
            pressed && styles.panelButtonPressed,
          ]}
        >
          <Text style={styles.panelButtonText}>Step 1</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            goTo(2);
          }}
          style={({ pressed }) => [
            styles.panelButton,
            pressed && styles.panelButtonPressed,
          ]}
        >
          <Text style={styles.panelButtonText}>Step 2</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            goTo(3);
          }}
          style={({ pressed }) => [
            styles.panelButton,
            pressed && styles.panelButtonPressed,
          ]}
        >
          <Text style={styles.panelButtonText}>Step 3</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={stop}
          style={({ pressed }) => [
            styles.panelButton,
            styles.panelButtonStop,
            pressed && styles.panelButtonStopPressed,
          ]}
        >
          <Text style={styles.panelButtonStopText}>Stop</Text>
        </Pressable>
      </View>

      <View style={styles.optionBlock}>
        <Text style={styles.optionLabel}>Backdrop</Text>
        <View style={styles.swatchRow}>
          {BACKDROP_OPTIONS.map((option) => {
            const active = option.value === backdropColor;
            return (
              <Pressable
                key={option.label}
                accessibilityRole="button"
                onPress={() => {
                  setBackdropColor(option.value);
                }}
                style={({ pressed }) => [
                  styles.swatch,
                  { backgroundColor: option.value },
                  active && styles.swatchActive,
                  pressed && styles.swatchPressed,
                ]}
              >
                <Text style={styles.swatchText}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.optionBlock}>
        <Text style={styles.optionLabel}>
          Transition duration, now {String(transitionDuration)}ms
        </Text>
        <View style={styles.durationRow}>
          {DURATION_OPTIONS.map((duration) => {
            const active = duration === transitionDuration;
            return (
              <Pressable
                key={String(duration)}
                accessibilityRole="button"
                onPress={() => {
                  setTransitionDuration(duration);
                }}
                style={({ pressed }) => [
                  styles.durationButton,
                  active && styles.durationButtonActive,
                  pressed && styles.durationButtonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.durationButtonText,
                    active && styles.durationButtonTextActive,
                  ]}
                >
                  {`${String(duration)}ms`}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export function ProgrammaticScreen() {
  const step1 = useWalkthroughStep({
    number: 1,
    layoutAdjustments: { addPadding: 8 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "You jumped here",
      text: "goTo started the tour at this step. Tap the dim area to get back to the panel.",
    },
  });

  const step2 = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 8 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "Step two",
      text: "The panel can also change the backdrop color and transition speed while running.",
    },
  });

  const step3 = useWalkthroughStep({
    number: 3,
    layoutAdjustments: { addPadding: 8 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "Step three",
      text: "Pick another color above, then press Stop or tap the dim area to keep experimenting.",
    },
  });

  useWalkthroughStep({
    number: 4,
    fullScreen: true,
    OverlayComponent: FullScreenCard,
    overlayComponentProps: {
      title: "Full programmatic control",
      text: "start, stop, goTo, setBackdropColor, and setTransitionDuration are all on the context.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ControlPanel />
      <StartDemoButton label="Restart from step 1" />

      <View style={styles.card} onLayout={step1.onLayout}>
        <Text style={styles.cardTitle}>Usage this week</Text>
        <Text style={styles.cardText}>42 minutes of walking, 5 sessions.</Text>
      </View>

      <View style={styles.card} onLayout={step2.onLayout}>
        <Text style={styles.cardTitle}>Steps this week</Text>
        <Text style={styles.cardText}>36,410 steps in total.</Text>
      </View>

      <View style={styles.card} onLayout={step3.onLayout}>
        <Text style={styles.cardTitle}>Longest streak</Text>
        <Text style={styles.cardText}>11 days in a row.</Text>
      </View>

      <Text style={styles.footnote}>
        The panel stays interactive between steps, so you can jump around
        freely.
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
    gap: 12,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },
  panelText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  panelButton: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  panelButtonPressed: {
    backgroundColor: colors.border,
  },
  panelButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
  },
  panelButtonStop: {
    backgroundColor: colors.dangerSoft,
  },
  panelButtonStopPressed: {
    backgroundColor: "#EBCDC7",
  },
  panelButtonStopText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.danger,
  },
  optionBlock: {
    gap: 8,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    color: colors.inkFaint,
    textTransform: "uppercase",
  },
  swatchRow: {
    flexDirection: "row",
    gap: 8,
  },
  swatch: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchActive: {
    borderColor: colors.accent,
  },
  swatchPressed: {
    opacity: 0.7,
  },
  swatchText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "700",
  },
  durationRow: {
    flexDirection: "row",
    gap: 8,
  },
  durationButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  durationButtonActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  durationButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  durationButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.inkSoft,
  },
  durationButtonTextActive: {
    color: colors.accent,
    fontWeight: "700",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.ink,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkSoft,
  },
  footnote: {
    textAlign: "center",
    fontSize: 12,
    color: colors.inkFaint,
  },
});
