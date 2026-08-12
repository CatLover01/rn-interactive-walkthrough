import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

import type {
  WalkthroughMaskCoordinates,
  WalkthroughMaskProps,
} from "../types";
import { handlePress, toCoordinates } from "../utils";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type DimRectKind = "top" | "left" | "right" | "bottom";

type DimRectProps = {
  kind: DimRectKind;
  mask: SharedValue<WalkthroughMaskCoordinates>;
  pulseScale: SharedValue<number>;
  color: string;
  onPress?: () => void;
};

// Scales a mask rect about its center. Used by the pulse so the hole grows
// and shrinks around the target instead of around its top-left corner.
const scaleMask = (
  m: WalkthroughMaskCoordinates,
  scale: number,
): WalkthroughMaskCoordinates => {
  "worklet";
  if (scale === 1) {
    return { ...m };
  }
  const cx = m.x + m.width / 2;
  const cy = m.y + m.height / 2;
  const halfWidth = (m.width * scale) / 2;
  const halfHeight = (m.height * scale) / 2;
  return {
    x: cx - halfWidth,
    y: cy - halfHeight,
    width: m.width * scale,
    height: m.height * scale,
  };
};

// One region of the dim. It renders the backdrop color and is the hit target
// for taps in that region. Regions share the exact same rounded coordinates,
// so the hole stays gap-free without any overlapping views.
const DimRect = ({ kind, mask, pulseScale, color, onPress }: DimRectProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const m = scaleMask(mask.value, pulseScale.value);

    switch (kind) {
      case "top":
        return { top: 0, left: 0, right: 0, height: m.y };
      case "left":
        return { top: m.y, left: 0, width: m.x, height: m.height };
      case "right":
        return {
          top: m.y,
          left: m.x + m.width,
          right: 0,
          height: m.height,
        };
      case "bottom":
        return { top: m.y + m.height, left: 0, right: 0, bottom: 0 };
    }
  }, [kind]);

  return (
    <AnimatedPressable
      style={[{ position: "absolute", backgroundColor: color }, animatedStyle]}
      onPress={onPress}
    />
  );
};

export const ViewMask = ({
  mask,
  onPressBackdrop,
  onPressMask,
  easing,
  entering,
  exiting,
  animationDuration: durationOverride,
  pulse,
  context,
}: WalkthroughMaskProps) => {
  const { animationDuration, backdropColor, debug, currentStepNumber } =
    context;
  const duration = durationOverride ?? animationDuration;
  const rounded = useSharedValue<WalkthroughMaskCoordinates>(
    toCoordinates(mask),
  );
  const pulseScale = useSharedValue(1);

  const effectivePulse = useMemo(
    () => (pulse ? { ...context.pulse, ...pulse } : context.pulse),
    [context.pulse, pulse],
  );

  // Animate the whole mask object with the configured easing. The animation
  // runs because it is assigned at the top level of the shared value, and it
  // follows the mask coordinates so it re-morphs whenever the step moves.
  useEffect(() => {
    rounded.value = withTiming(toCoordinates(mask), {
      duration,
      easing,
    });
  }, [rounded, mask, easing, duration]);

  // Start (or restart) the idle pulse. Keyed on the step identity rather than
  // the mask coordinates so it replays every time we land on a step, even when
  // navigating back to one with an otherwise identical mask.
  useEffect(() => {
    pulseScale.value = 1;
    if (effectivePulse.enabled && effectivePulse.scale !== 1) {
      pulseScale.value = withDelay(
        duration + effectivePulse.delay,
        withRepeat(
          withTiming(effectivePulse.scale, {
            duration: effectivePulse.duration,
            easing: effectivePulse.easing,
          }),
          -1,
          true,
        ),
      );
    }
  }, [pulseScale, effectivePulse, duration, currentStepNumber]);

  const handleBackdropPress = handlePress(onPressBackdrop, context);
  const handleMaskPress = handlePress(onPressMask, context);

  const coverStyle = useAnimatedStyle(() => {
    const m = scaleMask(rounded.value, pulseScale.value);
    return {
      top: m.y,
      left: m.x,
      width: m.width,
      height: m.height,
    };
  });

  const dimRectProps = {
    mask: rounded,
    pulseScale,
    color: backdropColor,
    onPress: handleBackdropPress,
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill}
      entering={entering}
      exiting={exiting}
    >
      <DimRect kind="top" {...dimRectProps} />
      <DimRect kind="left" {...dimRectProps} />
      <DimRect kind="right" {...dimRectProps} />
      <DimRect kind="bottom" {...dimRectProps} />
      {!mask.allowInteraction && (
        <AnimatedPressable
          style={[
            { position: "absolute" },
            coverStyle,
            ...(debug ? [{ borderWidth: 1, borderColor: "yellow" }] : []),
          ]}
          onPress={handleMaskPress}
        />
      )}
    </Animated.View>
  );
};
