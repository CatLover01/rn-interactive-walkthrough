import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWalkthrough, useWalkthroughStep } from "rn-interactive-walkthrough";

import { DemoCard } from "../components/DemoCard";
import { FullScreenCard } from "../components/FullScreenCard";
import { Tooltip } from "../components/Tooltip";
import { demos } from "../demos";
import { colors } from "../theme";
import type { DemoDescriptor } from "../types";

type GalleryScreenProps = {
  onOpen: (demo: DemoDescriptor) => void;
};

export function GalleryScreen({ onOpen }: GalleryScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const { start, isReady } = useWalkthrough();

  const headerStep = useWalkthroughStep({
    number: 1,
    layoutAdjustments: { addPadding: 4 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    contentComponent: Tooltip,
    contentComponentProps: {
      title: "Every card is a working demo",
      text: "Each entry is a full example you can open. Pick one, or follow this tour first.",
    },
  });

  const firstCardStep = useWalkthroughStep({
    number: 2,
    layoutAdjustments: { addPadding: 4 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    contentComponent: Tooltip,
    contentComponentProps: {
      title: "Open a demo",
      text: "Tap a card to open it. When a tour runs, the mask shows exactly what is highlighted.",
    },
  });

  const secondCardStep = useWalkthroughStep({
    number: 3,
    layoutAdjustments: { addPadding: 4 },
    onPressBackdrop: (ctx) => ctx?.stop(),
    contentComponent: Tooltip,
    contentComponentProps: {
      title: "Eight demos inside",
      text: "Start with the first one. The rest layer on more features of the library.",
    },
  });

  useWalkthroughStep({
    number: 4,
    fullScreen: true,
    contentComponent: FullScreenCard,
    contentComponentProps: {
      title: "You made it",
      text: "Tap any card to open it. Tapping the dim area skips ahead when a tour is running.",
      action: "Done",
      mode: "stop",
    },
  });

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: 12,
            paddingTop: top + 10,
            paddingBottom: bottom + 10,
          },
        ]}
      >
        <View style={styles.header} onLayout={headerStep.onLayout}>
          <Text style={styles.eyebrow}>rn-interactive-walkthrough</Text>
          <Text style={styles.title}>Walkthrough gallery</Text>
          <Text style={styles.subtitle}>
            A set of small working demos. Open one to try the library, or run
            the tour to see the masks in action.
          </Text>
          <Pressable
            accessibilityRole="button"
            disabled={!isReady}
            onPress={start}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
              !isReady && styles.startButtonDisabled,
            ]}
          >
            <Text style={styles.startButtonText}>Run the gallery tour</Text>
          </Pressable>
        </View>

        <View style={styles.list}>
          {demos.map((demo, index) => (
            <DemoCard
              key={demo.id}
              demo={demo}
              onOpen={onOpen}
              onLayout={
                index === 0
                  ? firstCardStep.onLayout
                  : index === 1
                    ? secondCardStep.onLayout
                    : undefined
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    gap: 14,
  },
  header: {
    gap: 10,
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: colors.accent,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.ink,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.inkSoft,
  },
  startButton: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  startButtonPressed: {
    backgroundColor: colors.accentPressed,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    color: colors.onAccent,
    fontSize: 14,
    fontWeight: "700",
  },
  list: {
    gap: 12,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: colors.inkFaint,
    marginTop: 4,
  },
});
