import { Pressable, StyleSheet, Text } from "react-native";
import { useWalkthrough } from "rn-interactive-walkthrough";

import { colors } from "../theme";

type StartDemoButtonProps = {
  label?: string;
};

export function StartDemoButton({
  label = "Run the tour",
}: StartDemoButtonProps) {
  const { start, isReady } = useWalkthrough();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={!isReady}
      onPress={start}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        !isReady && styles.buttonDisabled,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  buttonPressed: {
    backgroundColor: colors.accentPressed,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.onAccent,
    fontSize: 15,
    fontWeight: "700",
  },
  chevron: {
    color: colors.onAccent,
    fontSize: 20,
    lineHeight: 22,
    marginTop: -2,
  },
});
