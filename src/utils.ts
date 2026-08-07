import { LayoutAnimation, Platform, UIManager } from "react-native";

export const isAndroid = Platform.OS === "android";

// Convenience method to enable this if it's not already enabled in your app.
// https://reactnative.dev/docs/layoutanimation.html#easeineaseout
export const enableExperimentalLayoutAnimation = () => {
  if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};

export const defaultAnimateNextLayoutChange = (
  duration: number | undefined,
) => {
  LayoutAnimation.configureNext({
    duration: duration ?? 0,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.scaleXY,
    },
  });
};

export const defaultUseIsFocused = () => true;
