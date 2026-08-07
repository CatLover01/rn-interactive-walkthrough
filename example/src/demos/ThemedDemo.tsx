import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useWalkthroughStep } from "rn-interactive-walkthrough";

import { colors } from "../theme";
import { ThemedTooltip } from "../components/ThemedTooltip";
import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";

export function ThemedScreen() {
  const step1 = useWalkthroughStep({
    number: 1,
    layoutAdjustments: { addPadding: 8 },
    OverlayComponent: ThemedTooltip,
    overlayComponentProps: {
      title: "Overlays match your theme",
      text: "This tooltip is a plain light card, picked to contrast with the dark screen.",
    },
  });

  const step2 = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 8 },
    OverlayComponent: ThemedTooltip,
    overlayComponentProps: {
      title: "Just a styled component",
      text: "No theme system is needed. Style the overlay however you would style any view.",
    },
  });

  useWalkthroughStep({
    number: 3,
    fullScreen: true,
    OverlayComponent: FullScreenCard,
    overlayComponentProps: {
      title: "Dark finale",
      text: "Even the full-screen card takes a dark variant, so the whole tour stays in the app's style.",
      action: "Done",
      mode: "stop",
      dark: true,
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.intro}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CA</Text>
        </View>
        <View style={styles.introBody}>
          <Text style={styles.introTitle}>Cat Adams</Text>
          <Text style={styles.introText}>Product designer, night owl.</Text>
        </View>
      </View>

      <StartDemoButton />

      <View style={styles.card} onLayout={step1.onLayout}>
        <Text style={styles.cardTitle}>Profile visibility</Text>
        <Text style={styles.cardText}>
          Only people you follow can see your activity.
        </Text>
      </View>

      <View style={styles.card} onLayout={step2.onLayout}>
        <Text style={styles.cardTitle}>Theme</Text>
        <Text style={styles.cardText}>
          Dark, matching the rest of this demo screen.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Location</Text>
        <Text style={styles.cardText}>Somewhere between two timezones.</Text>
      </View>

      <Text style={styles.footnote}>
        Run the tour to see light tooltips on a dark screen.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBg,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
    gap: 12,
  },
  intro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    backgroundColor: colors.darkSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    marginBottom: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.onAccent,
    fontSize: 18,
    fontWeight: "800",
  },
  introBody: {
    flex: 1,
    gap: 2,
  },
  introTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.darkInk,
  },
  introText: {
    fontSize: 13,
    color: colors.darkMuted,
  },
  card: {
    backgroundColor: colors.darkSurface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    padding: 16,
    gap: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.darkInk,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.darkMuted,
  },
  footnote: {
    textAlign: "center",
    fontSize: 12,
    color: colors.darkMuted,
  },
});
