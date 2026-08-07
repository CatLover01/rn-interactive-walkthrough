import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";

type OverlayFooterProps = {
  next: () => void;
  previous: () => void;
  stop: () => void;
  isFirst: boolean;
  isLast: boolean;
  tone?: "dark" | "light";
};

export function OverlayFooter({
  next,
  previous,
  stop,
  isFirst,
  isLast,
  tone = "light",
}: OverlayFooterProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        disabled={isFirst}
        onPress={previous}
        hitSlop={8}
        style={({ pressed }) => [
          styles.ghost,
          tone === "dark" && styles.ghostDark,
          pressed && styles.ghostPressed,
          isFirst && styles.disabled,
        ]}
      >
        <Text
          style={[
            styles.ghostText,
            tone === "dark" && styles.ghostTextDark,
            isFirst && styles.ghostTextDisabled,
          ]}
        >
          Back
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={isLast ? stop : next}
        style={({ pressed }) => [
          styles.primary,
          pressed && styles.primaryPressed,
        ]}
      >
        <Text style={styles.primaryText}>{isLast ? "Done" : "Next"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },
  ghost: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ghostDark: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  ghostPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  ghostText: {
    color: colors.inkSoft,
    fontSize: 14,
    fontWeight: "600",
  },
  ghostTextDark: {
    color: colors.tooltipMuted,
  },
  ghostTextDisabled: {
    opacity: 0.45,
  },
  disabled: {
    opacity: 0.45,
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed,
  },
  primaryText: {
    color: colors.onAccent,
    fontSize: 14,
    fontWeight: "700",
  },
});
