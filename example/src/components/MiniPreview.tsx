import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";
import type { DemoPreviewKind } from "../types";

type MiniPreviewProps = {
  kind: DemoPreviewKind;
};

function Bar({
  width = 30,
  height = 5,
  color = colors.borderStrong,
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  style?: object;
}) {
  return (
    <View
      style={[
        { width, height, borderRadius: 3, backgroundColor: color },
        style,
      ]}
    />
  );
}

function Row({
  highlighted = false,
  withSwitch = false,
  withButton = false,
}: {
  highlighted?: boolean;
  withSwitch?: boolean;
  withButton?: boolean;
}) {
  return (
    <View style={[styles.row, highlighted && styles.rowHighlighted]}>
      <Bar
        width={40}
        color={highlighted ? colors.accent : colors.borderStrong}
      />
      {withButton ? (
        <View style={styles.miniButton}>
          <Bar width={16} height={3} color={colors.onAccent} />
        </View>
      ) : null}
      {withSwitch ? (
        <View style={styles.miniSwitch}>
          <View style={styles.miniSwitchThumb} />
        </View>
      ) : null}
    </View>
  );
}

function MiniTooltips() {
  return (
    <View style={styles.fill}>
      <Row />
      <Row highlighted />
      <Row />
      <View style={styles.miniTooltip}>
        <View style={[styles.miniTooltipDot, { top: -4, left: 18 }]} />
        <Bar width={40} height={4} color="#C9C2B2" />
        <Bar width={26} height={3} color="#E5E1D5" style={{ marginTop: 4 }} />
      </View>
    </View>
  );
}

function MiniInteractive() {
  return (
    <View style={styles.fill}>
      <Row withSwitch />
      <Row highlighted withSwitch />
      <Row withSwitch />
      <View style={styles.miniChip}>
        <Text style={styles.miniChipText}>off</Text>
      </View>
    </View>
  );
}

function MiniTap() {
  return (
    <View style={styles.fill}>
      <Row />
      <Row />
      <View style={styles.miniTapTarget}>
        <Bar width={26} height={4} color={colors.onAccent} />
      </View>
      <View style={styles.miniFinger}>
        <View style={styles.miniFingerDot} />
      </View>
      <View style={styles.miniTapTooltip}>
        <Bar width={32} height={4} color={colors.tooltipMuted} />
      </View>
    </View>
  );
}

function MiniFullScreen() {
  return (
    <View style={[styles.fill, styles.fillAccent]}>
      <View style={styles.miniFullCircle}>
        <View style={styles.miniFullDot} />
      </View>
      <Bar width={44} height={5} color="rgba(255,255,255,0.9)" />
      <Bar
        width={30}
        height={4}
        color="rgba(255,255,255,0.55)"
        style={{ marginTop: 5 }}
      />
      <View style={styles.miniFullButton}>
        <Bar width={18} height={3} color={colors.accent} />
      </View>
    </View>
  );
}

function MiniVariety() {
  return (
    <View style={styles.fill}>
      <Row />
      <Row />
      <Row />
      <View style={styles.miniCallout}>
        <Bar width={20} height={3} color="#C9C2B2" />
      </View>
      <View style={styles.miniSheet}>
        <View style={styles.miniHandle} />
        <Bar width={36} height={4} color={colors.borderStrong} />
        <Bar
          width={24}
          height={3}
          color={colors.border}
          style={{ marginTop: 4 }}
        />
      </View>
    </View>
  );
}

function MiniProgrammatic() {
  return (
    <View style={styles.fill}>
      <Row highlighted withButton />
      <Row withButton />
      <View style={styles.miniSwatches}>
        <View style={[styles.miniSwatch, { backgroundColor: "#26231C" }]} />
        <View style={[styles.miniSwatch, { backgroundColor: colors.accent }]} />
        <View style={[styles.miniSwatch, { backgroundColor: "#2F4B5C" }]} />
      </View>
    </View>
  );
}

function MiniThemed() {
  return (
    <View style={[styles.fill, { backgroundColor: colors.darkBg }]}>
      <View style={styles.themedRow}>
        <Bar width={34} height={4} color={colors.darkMuted} />
      </View>
      <View style={styles.themedCard}>
        <Bar width={38} height={4} color={colors.ink} />
        <Bar
          width={26}
          height={3}
          color={colors.borderStrong}
          style={{ marginTop: 4 }}
        />
      </View>
      <View style={styles.themedCard}>
        <Bar width={32} height={4} color={colors.ink} />
      </View>
    </View>
  );
}

function PreviewBody({ kind }: MiniPreviewProps) {
  switch (kind) {
    case "tooltips":
      return <MiniTooltips />;
    case "interactive":
      return <MiniInteractive />;
    case "tap":
      return <MiniTap />;
    case "fullscreen":
      return <MiniFullScreen />;
    case "variety":
      return <MiniVariety />;
    case "programmatic":
      return <MiniProgrammatic />;
    case "themed":
      return <MiniThemed />;
  }
}

export function MiniPreview({ kind }: MiniPreviewProps) {
  return (
    <View style={styles.frame}>
      <PreviewBody kind={kind} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 104,
    height: 132,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: "hidden",
    padding: 8,
  },
  fill: {
    flex: 1,
    gap: 7,
    justifyContent: "center",
  },
  fillAccent: {
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    margin: -8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rowHighlighted: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  miniSwitch: {
    width: 14,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#C9C2B2",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 1,
  },
  miniSwitchThumb: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surface,
  },
  miniButton: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  miniTooltip: {
    position: "absolute",
    bottom: 4,
    left: 12,
    right: 12,
    backgroundColor: colors.tooltipBg,
    borderRadius: 8,
    padding: 7,
  },
  miniTooltipDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.tooltipBg,
  },
  miniChip: {
    position: "absolute",
    bottom: 6,
    alignSelf: "center",
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  miniChipText: {
    fontSize: 7,
    fontWeight: "700",
    color: colors.accent,
  },
  miniTapTarget: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 9,
  },
  miniFinger: {
    position: "absolute",
    right: 12,
    top: 56,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  miniFingerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  miniTapTooltip: {
    position: "absolute",
    bottom: 4,
    left: 12,
    right: 12,
    backgroundColor: colors.tooltipBg,
    borderRadius: 8,
    padding: 7,
    alignItems: "center",
  },
  miniFullCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  miniFullDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.onAccent,
  },
  miniFullButton: {
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  miniCallout: {
    position: "absolute",
    top: 26,
    right: 6,
    backgroundColor: colors.tooltipBg,
    borderRadius: 8,
    padding: 6,
  },
  miniSheet: {
    position: "absolute",
    bottom: 4,
    left: 8,
    right: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 7,
  },
  miniHandle: {
    alignSelf: "center",
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.borderStrong,
    marginBottom: 4,
  },
  miniSwatches: {
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
  },
  miniSwatch: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  themedRow: {
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  themedCard: {
    backgroundColor: colors.darkSurface,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    padding: 7,
  },
});
