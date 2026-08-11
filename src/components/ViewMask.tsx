import { useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
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

// Rounded variant: the hole is the content box of a single view, the dim is
// its border (borderRadius - borderWidth = the hole radius). Caveats: keep the
// radius <= half the smaller target dimension (larger values clamp into a
// pill); the radius is static per step (changing it between steps snaps); and
// large semi-transparent curved borders can occasionally show seams, so verify
// on device.
const MaskHole = ({
  mask,
  color,
  radius,
  onPress,
}: {
  mask: SharedValue<WalkthroughMaskCoordinates>;
  color: string;
  radius: number;
  onPress?: () => void;
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const borderWidth = Math.max(screenWidth, screenHeight);

  const animatedStyle = useAnimatedStyle(() => {
    const m = mask.value;
    const x = Math.round(m.x);
    const y = Math.round(m.y);
    const width = Math.round(m.width);
    const height = Math.round(m.height);

    return {
      left: x - borderWidth,
      top: y - borderWidth,
      width: width + 2 * borderWidth,
      height: height + 2 * borderWidth,
    };
  }, [borderWidth]);

  return (
    <AnimatedPressable
      style={[
        {
          position: "absolute",
          backgroundColor: "transparent",
          borderWidth,
          borderColor: color,
          borderRadius: radius + borderWidth,
        },
        animatedStyle,
      ]}
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

  const radius = mask.borderRadius;
  const cornerProps = {
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
      {typeof radius === "number" && radius > 0 ? (
        <MaskHole radius={radius} {...cornerProps} />
      ) : (
        <>
          <DimRect kind="top" {...cornerProps} />
          <DimRect kind="left" {...cornerProps} />
          <DimRect kind="right" {...cornerProps} />
          <DimRect kind="bottom" {...cornerProps} />
        </>
      )}
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
