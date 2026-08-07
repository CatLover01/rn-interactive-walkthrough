import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useWalkthroughStep } from "rn-interactive-walkthrough";

import { FullScreenCard } from "../components/FullScreenCard";
import { StartDemoButton } from "../components/StartDemoButton";
import { Tooltip } from "../components/Tooltip";
import { colors } from "../theme";

export function InteractiveTargetsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [exported, setExported] = useState(false);

  const step1 = useWalkthroughStep({
    number: 1,
    maskAllowInteraction: true,
    layoutAdjustments: { addPadding: 6 },
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "The mask lets you interact",
      text: "This row stays tappable while it is highlighted. Go on, flip the switch.",
    },
  });

  const step2 = useWalkthroughStep({
    number: 2,
    maskAllowInteraction: true,
    layoutAdjustments: { addPadding: 6 },
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "Even destructive buttons",
      text: "This mask is interactive too. Tap the button, then continue with Next.",
    },
  });

  const step3 = useWalkthroughStep({
    number: 3,
    maskAllowInteraction: false,
    layoutAdjustments: { addPadding: 6 },
    OverlayComponent: Tooltip,
    overlayComponentProps: {
      title: "A read-only highlight",
      text: "This button is real, but the mask swallows the tap. Without maskAllowInteraction, blocking is the default.",
    },
  });

  useWalkthroughStep({
    number: 4,
    fullScreen: true,
    OverlayComponent: FullScreenCard,
    overlayComponentProps: {
      title: "Controls stay usable",
      text: "Pass maskAllowInteraction to keep the target pressable during the tour.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Settings</Text>
        <Text style={styles.introText}>
          The first two rows stay usable while the tour runs. The last one shows
          the default blocked state.
        </Text>
        <StartDemoButton />
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>Notifications</Text>
      </View>
      <View style={styles.card} onLayout={step1.onLayout}>
        <View style={styles.cardRow}>
          <View style={styles.cardBody}>
            <Text style={styles.rowTitle}>Push notifications</Text>
            <Text style={styles.rowText}>
              New messages, mentions, and replies.
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: "#C9C2B2", true: colors.accent }}
            thumbColor={colors.surface}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.cardRow}>
          <View style={styles.cardBody}>
            <Text style={styles.rowTitle}>Weekly digest</Text>
            <Text style={styles.rowText}>
              A summary of your activity every Monday.
            </Text>
          </View>
          <Switch
            value={digestEnabled}
            onValueChange={setDigestEnabled}
            trackColor={{ false: "#C9C2B2", true: colors.accent }}
            thumbColor={colors.surface}
          />
        </View>
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>Account</Text>
      </View>
      <View style={[styles.card, styles.cardDanger]} onLayout={step2.onLayout}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setDeleted((value) => !value);
          }}
          style={({ pressed }) => [
            styles.dangerButton,
            pressed && styles.dangerButtonPressed,
          ]}
        >
          <Text style={styles.dangerButtonText}>
            {deleted ? "Undo delete" : "Delete account"}
          </Text>
        </Pressable>
        <Text style={styles.dangerNote}>
          {deleted
            ? "Nothing happened, this is a demo. Tap again to toggle."
            : "Tapping this does nothing serious, it just toggles this note."}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onLayout={step3.onLayout}
        onPress={() => {
          setExported((value) => !value);
        }}
        style={({ pressed }) => [
          styles.exportButton,
          pressed && styles.exportButtonPressed,
        ]}
      >
        <View style={styles.cardBody}>
          <Text style={styles.rowTitle}>Export my data</Text>
          <Text style={styles.rowText}>
            {exported
              ? "Export started. The mask blocks taps while step 3 is active."
              : "Downloads a copy of your data as JSON."}
          </Text>
        </View>
        <View style={styles.exportTag}>
          <Text style={styles.exportTagText}>CSV</Text>
        </View>
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
  sectionLabel: {
    marginTop: 4,
    marginBottom: -2,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    color: colors.inkFaint,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cardBody: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.ink,
  },
  rowText: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  cardDanger: {
    backgroundColor: colors.surface,
    gap: 10,
  },
  dangerButton: {
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  dangerButtonPressed: {
    backgroundColor: "#EBCDC7",
  },
  dangerButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "700",
  },
  dangerNote: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.inkFaint,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 12,
    padding: 14,
  },
  exportButtonPressed: {
    backgroundColor: "#CBE4DA",
  },
  exportTag: {
    backgroundColor: colors.accentSoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  exportTagText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent,
  },
});
