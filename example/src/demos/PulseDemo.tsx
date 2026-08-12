import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWalkthroughStep } from "rn-interactive-walkthrough";

import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";
import { Tooltip } from "../components/Tooltip";
import { colors } from "../theme";

export function PulseScreen() {
  const step1 = useWalkthroughStep({
    number: 1,
    layoutAdjustments: { addPadding: 8 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    contentComponent: Tooltip,
    contentComponentProps: {
      title: "Watch the mask breathe",
      text: "As soon as this step is settled, after a short delay the highlighted area starts pulsing — growing, shrinking, growing again.",
    },
  });

  const step2 = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 8 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    pulse: { delay: 1000, duration: 1000, scale: 1.06 },
    maskAllowInteraction: true,
    contentComponent: Tooltip,
    contentComponentProps: {
      title: "One object, many options",
      text: "The pulse is a single provider prop with options: enabled, delay, duration, scale and easing. Tune them all from one place.",
    },
  });

  useWalkthroughStep({
    number: 3,
    fullScreen: true,
    contentComponent: FullScreenCard,
    contentComponentProps: {
      title: "Pulse draws the eye",
      text: "A subtle, repeating scale hints that the highlighted action is there and tappable.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Pulsing mask</Text>
        <Text style={styles.introText}>
          Once a step stops moving, the cut-out gently pulses to draw attention
          to the target.
        </Text>
        <StartDemoButton />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          This primary action pulses while it is highlighted. The beat starts
          only after the mask has finished animating into place, so it never
          fights the morph.
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
          <Text style={styles.primaryText}>Highlighted action</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          The pulse is a single provider `pulse` object, so you control the
          whole behaviour from one place. Full option details are in the API
          reference.
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
          <Text style={styles.secondaryText}>Another target</Text>
        </Pressable>
      </View>
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
});
