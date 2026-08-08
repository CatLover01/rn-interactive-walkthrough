import { Pressable, StyleSheet, Text, View } from "react-native";
import type { ContentComponentProps } from "rn-interactive-walkthrough";

import { colors } from "../theme";

export type FullScreenCardProps = ContentComponentProps & {
  title: string;
  text: string;
  action?: string;
  mode?: "next" | "stop";
  dark?: boolean;
};

export function FullScreenCard({
  title,
  text,
  action = "Next",
  mode = "next",
  dark = false,
  next,
  stop,
}: FullScreenCardProps) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={[styles.card, dark && styles.cardDark]}>
        <View style={[styles.icon, dark && styles.iconDark]}>
          <Text style={[styles.iconText, dark && styles.iconTextDark]}>
            {mode === "stop" ? "✓" : "•"}
          </Text>
        </View>
        <Text style={[styles.title, dark && styles.titleDark]}>{title}</Text>
        <Text style={[styles.text, dark && styles.textDark]}>{text}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={mode === "stop" ? stop : next}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{action}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.24,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 18,
  },
  cardDark: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.darkBorder,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconDark: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  iconText: {
    color: colors.accent,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 30,
  },
  iconTextDark: {
    color: colors.tooltipAccent,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.ink,
    textAlign: "center",
    marginBottom: 8,
  },
  titleDark: {
    color: colors.darkInk,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.inkSoft,
    textAlign: "center",
  },
  textDark: {
    color: colors.darkMuted,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonPressed: {
    backgroundColor: colors.accentPressed,
  },
  buttonText: {
    color: colors.onAccent,
    fontSize: 15,
    fontWeight: "700",
  },
});
