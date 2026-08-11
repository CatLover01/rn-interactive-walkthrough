import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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
  color: string;
  onPress?: () => void;
};

// One region of the dim. It renders the backdrop color and is the hit target
// for taps in that region. Regions share the exact same rounded coordinates,
// so the hole stays gap-free without any overlapping views.
const DimRect = ({ kind, mask, color, onPress }: DimRectProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const m = mask.value;
    const x = Math.round(m.x);
    const y = Math.round(m.y);
    const width = Math.round(m.width);
    const height = Math.round(m.height);

    switch (kind) {
      case "top":
        return { top: 0, left: 0, right: 0, height: y };
      case "left":
        return { top: y, left: 0, width: x, height };
      case "right":
        return { top: y, left: x + width, right: 0, height };
      case "bottom":
        return { top: y + height, left: 0, right: 0, bottom: 0 };
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
  context,
}: WalkthroughMaskProps) => {
  const { animationDuration, backdropColor, debug } = context;
  const duration = durationOverride ?? animationDuration;
  const rounded = useSharedValue<WalkthroughMaskCoordinates>(
    toCoordinates(mask),
  );

  // Animate the whole mask object with the configured easing. The animation
  // runs because it is assigned at the top level of the shared value.
  useEffect(() => {
    rounded.value = withTiming(toCoordinates(mask), {
      duration,
      easing,
    });
  }, [rounded, mask, easing, duration]);

  const handleBackdropPress = handlePress(onPressBackdrop, context);
  const handleMaskPress = handlePress(onPressMask, context);

  const coverStyle = useAnimatedStyle(() => {
    const m = rounded.value;
    return {
      top: Math.round(m.y),
      left: Math.round(m.x),
      width: Math.round(m.width),
      height: Math.round(m.height),
    };
  });

  const dimRectProps = {
    mask: rounded,
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
      {mask.allowInteraction !== true && (
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
