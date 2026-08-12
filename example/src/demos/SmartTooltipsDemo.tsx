import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  WalkthroughStep,
  useWalkthroughStep,
} from "rn-interactive-walkthrough";

import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";
import { Tooltip } from "../components/Tooltip";
import { colors } from "../theme";

export function SmartTooltipsScreen() {
  useWalkthroughStep({
    number: 4,
    fullScreen: true,
    contentComponent: FullScreenCard,
    contentComponentProps: {
      title: "That's the core loop",
      text: "Highlight a view, measure it, explain it, move on. The other demos build on this.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>How the tooltips move</Text>
        <Text style={styles.introText}>
          Three cards, three tooltips that place themselves below or above based
          on the space available.
        </Text>
        <StartDemoButton />
      </View>

      <WalkthroughStep
        number={1}
        layoutAdjustments={{ addPadding: 8 }}
        contentComponent={Tooltip}
        contentComponentProps={{
          title: "Tooltip lands below",
          text: "There is room under this card, so the tooltip sits below it and points up at the mask.",
        }}
        style={styles.card}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>Register a step</Text>
          <Text style={styles.cardText}>
            Wrap the view in WalkthroughStep and it measures itself for you.
          </Text>
        </View>
      </WalkthroughStep>

      <WalkthroughStep
        number={3}
        layoutAdjustments={{ addPadding: 8 }}
        contentComponent={Tooltip}
        contentComponentProps={{
          title: "The arrow tracks the target",
          text: "The arrow stays centered on the highlighted card no matter which side the tooltip lands on.",
        }}
        style={styles.card}
      >
        <View style={[styles.badge, styles.badgeAlt]}>
          <Text style={styles.badgeText}>3</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>Drop a tooltip</Text>
          <Text style={styles.cardText}>
            Your overlay renders above the mask. This card sits near the bottom,
            so its tooltip flips up.
          </Text>
        </View>
      </WalkthroughStep>

      <WalkthroughStep
        number={2}
        layoutAdjustments={{ addPadding: 8 }}
        contentComponent={Tooltip}
        contentComponentProps={{
          title: "Tooltip flips above",
          text: "No room below this card, so the tooltip moves above it automatically.",
        }}
        style={styles.card}
      >
        <View style={[styles.badge, styles.badgeAlt2]}>
          <Text style={styles.badgeText}>2</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>Measure the mask</Text>
          <Text style={styles.cardText}>
            No onLayout to attach and no manual coordinates, the wrapper is
            measured automatically.
          </Text>
        </View>
      </WalkthroughStep>

      <Text style={styles.footnote}>
        Try the other demos to see more ways to use the library.
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
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 12,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeAlt: {
    backgroundColor: colors.surfaceAlt,
  },
  badgeAlt2: {
    backgroundColor: "#E7E0D0",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.accent,
  },
  cardBody: {
    flex: 1,
    gap: 3,
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
    marginTop: 6,
  },
});
