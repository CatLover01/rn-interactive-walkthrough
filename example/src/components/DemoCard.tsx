import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LayoutChangeEvent } from "react-native";

import type { DemoDescriptor } from "../types";

import { colors } from "../theme";
import { MiniPreview } from "./MiniPreview";

type DemoCardProps = {
  demo: DemoDescriptor;
  onOpen: (demo: DemoDescriptor) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export function DemoCard({ demo, onOpen, onLayout }: DemoCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onOpen(demo);
      }}
      onLayout={onLayout}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.preview}>
        <MiniPreview kind={demo.preview} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{demo.title}</Text>
        <Text style={styles.description}>{demo.description}</Text>
        <Text style={styles.open}>Open demo</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 14,
  },
  cardPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  preview: {
    alignSelf: "flex-start",
  },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
  },
  open: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: colors.accent,
  },
  chevron: {
    fontSize: 24,
    color: colors.inkFaint,
    marginLeft: 2,
  },
});
