import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWalkthroughStep } from "rn-interactive-walkthrough";

import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";
import { Tooltip } from "../components/Tooltip";
import { colors } from "../theme";

export function FullScreenDemoScreen() {
  useWalkthroughStep({
    number: 1,
    fullScreen: true,
    contentComponent: FullScreenCard,
    contentComponentProps: {
      title: "Full-screen overlays",
      text: "fullScreen: true hides everything behind a mask and layers your overlay on top. Great for welcomes.",
    },
  });

  const ctaStep = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 8 },
    contentComponent: Tooltip,
    contentComponentProps: {
      title: "Back to normal steps",
      text: "Regular steps highlight one target at a time, exactly like the other demos.",
    },
  });

  useWalkthroughStep({
    number: 3,
    fullScreen: true,
    contentComponent: FullScreenCard,
    contentComponentProps: {
      title: "And a finale",
      text: "End the tour with another full-screen overlay, or with a simple tooltip step.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Welcome screen</Text>
        </View>
        <Text style={styles.heroTitle}>A quick tour of the app</Text>
        <Text style={styles.heroText}>
          Run the tour to see the welcome card, a regular step, and a closing
          card.
        </Text>
        <StartDemoButton />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What this demo shows</Text>
        <Text style={styles.cardText}>
          Step one and three use fullScreen, step two is a regular tooltip. Mix
          them in any order.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => {}}
        onLayout={ctaStep.onLayout}
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
      >
        <Text style={styles.ctaText}>Get started</Text>
      </Pressable>
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
  hero: {
    backgroundColor: colors.accent,
    borderRadius: 18,
    padding: 20,
    gap: 8,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 2,
  },
  heroBadgeText: {
    color: colors.onAccent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  heroTitle: {
    color: colors.onAccent,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  heroText: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
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
  cta: {
    backgroundColor: colors.ink,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  ctaPressed: {
    backgroundColor: "#3A362E",
  },
  ctaText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "700",
  },
});
