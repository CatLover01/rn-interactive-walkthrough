import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useWalkthroughStep } from "rn-interactive-walkthrough";

import { BottomSheetOverlay } from "../components/BottomSheetOverlay";
import { CalloutPill } from "../components/CalloutPill";
import { CenterCardOverlay } from "../components/CenterCardOverlay";
import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";
import { Tooltip } from "../components/Tooltip";
import { colors } from "../theme";

export function OverlayVarietyScreen() {
  const pillStep = useWalkthroughStep({
    number: 1,
    layoutAdjustments: { addPadding: 6 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: CalloutPill,
    overlayComponentProps: {
      text: "A compact callout, if that's all you need.",
    },
  });

  const sheetStep = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 6 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: BottomSheetOverlay,
    overlayComponentProps: {
      title: "A bottom sheet",
      text: "The overlay is just a component, so anchor it anywhere you like.",
    },
  });

  const centerStep = useWalkthroughStep({
    number: 3,
    layoutAdjustments: { addPadding: 6 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: CenterCardOverlay,
    overlayComponentProps: {
      title: "Or a centered card",
      text: "Render whatever fits your app. Nothing about the overlay shape is fixed.",
    },
  });

  const tooltipStep = useWalkthroughStep({
    number: 4,
    layoutAdjustments: { addPadding: 6 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "Back to a classic tooltip",
      text: "Every step can use a different overlay, even within the same tour.",
    },
  });

  useWalkthroughStep({
    number: 5,
    fullScreen: true,
    OverlayComponent: FullScreenCard,
    overlayComponentProps: {
      title: "Pick a style per step",
      text: "Callouts, sheets, centered cards, tooltips. It's all just React.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Overlay styles</Text>
        <Text style={styles.introText}>
          Four targets, four different overlays, one walkthrough.
        </Text>
        <StartDemoButton />
      </View>

      <View style={styles.card} onLayout={pillStep.onLayout}>
        <Text style={styles.cardTitle}>Roadmap</Text>
        <Text style={styles.cardText}>
          A short list of things we want to ship.
        </Text>
      </View>

      <View style={styles.card} onLayout={sheetStep.onLayout}>
        <Text style={styles.cardTitle}>Better search</Text>
        <Text style={styles.cardText}>
          Fuzzy matching and saved recent queries.
        </Text>
      </View>

      <View style={styles.card} onLayout={centerStep.onLayout}>
        <Text style={styles.cardTitle}>Offline sync</Text>
        <Text style={styles.cardText}>
          Queue writes and merge on reconnect.
        </Text>
      </View>

      <View style={styles.card} onLayout={tooltipStep.onLayout}>
        <Text style={styles.cardTitle}>Dark mode</Text>
        <Text style={styles.cardText}>
          Follows the system setting, no toggle needed.
        </Text>
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
    gap: 12,
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
});
