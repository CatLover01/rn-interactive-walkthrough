import { View } from "react-native";

import { useWalkthroughStep } from "../hooks/useWalkthroughStep";
import type { ContentComponentProps, WalkthroughStepProps } from "../types";

/**
 * Registers a walkthrough step and measures its target automatically.
 *
 * This is the component form of {@link useWalkthroughStep}. It accepts the same
 * options, but instead of returning an `onLayout` for you to attach, it wraps
 * its {@link WalkthroughStepProps.children} in a `View` and wires up the
 * measurement itself. The mask covers exactly that wrapping view (adjusted by
 * {@link WalkthroughStepType.layoutAdjustments}).
 *
 * Prefer this when you want to highlight a subtree without manually hooking
 * `onLayout`; use {@link useWalkthroughStep} when you need to attach the
 * handler to an existing view or a full-screen step.
 * */
export const WalkthroughStep = <
  P extends ContentComponentProps = ContentComponentProps,
>({
  children,
  style,
  fullScreen,
  ...step
}: WalkthroughStepProps<P>) => {
  const { onLayout } = useWalkthroughStep({
    fullScreen,
    ...step,
  });

  return (
    <View style={style} onLayout={fullScreen === true ? undefined : onLayout}>
      {children}
    </View>
  );
};
