import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ReactNode } from "react";

import { colors } from "../theme";

type DemoShellProps = {
  title: string;
  onBack: () => void;
  children: ReactNode;
};

export function DemoShell({ title, onBack, children }: DemoShellProps) {
  const insets = useSafeAreaInsets();

  const handleBackPress = useCallback(() => {
    onBack();
    return true;
  }, [onBack]);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress,
    );
    return () => {
      subscription.remove();
    };
  }, [handleBackPress]);

  return (
    <View style={[styles.shell, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to gallery"
          onPress={onBack}
          hitSlop={12}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.backButton} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  backText: {
    fontSize: 26,
    lineHeight: 28,
    color: colors.accent,
    fontWeight: "600",
    marginTop: -2,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
    paddingHorizontal: 8,
  },
});
