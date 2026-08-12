import { useCallback, useLayoutEffect, useRef } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { useWalkthrough } from "../context";
import type { WalkthroughMaskProps, WalkthroughStepType } from "../types";
import { handlePress } from "../utils";
import { ViewMask } from "./ViewMask";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const WalkthroughDisplayer = () => {
  const context = useWalkthrough();
  const {
    currentStep,
    currentStepNumber,
    backdropColor,
    debug,
    animations: { backdrop, content },
    contentComponent,
  } = context;

  const logStep = useCallback(
    (number: number, str: string) => {
      if (debug) {
        console.log(`[WT][${String(number)}]: ${str}`);
      }
    },
    [debug],
  );

  const prevStepRef = useRef<WalkthroughStepType | undefined>(undefined);

  const currentStepKey = currentStep?.identifier;

  useLayoutEffect(
    () => {
      const time = new Date();
      const prevStep = prevStepRef.current;
      // Only mark finish if we are advancing to the next step (going backwards doesn't count as marking off this step).
      // Or if we are at the end and currentStepNumber is undefined
      if (
        prevStep &&
        (typeof currentStepNumber !== "number" ||
          prevStep.number < currentStepNumber)
      ) {
        logStep(prevStep.number, `Finished at ${String(time.getTime())}`);
        prevStep.onFinish?.({ time });
      }

      if (currentStep) {
        logStep(currentStepNumber ?? 0, `Started at ${String(time.getTime())}`);
        currentStep.onStart?.({ time });
        currentStep.measureMask();
      }

      prevStepRef.current = currentStep;
    },
    // Need to do it based on the active step, since that changes when screens mount and things get added to the steps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStepKey],
  );

  if (!currentStep) {
    return null;
  }

  const maskProps: WalkthroughMaskProps = {
    mask: currentStep.computedMask ?? currentStep.mask,
    onPressBackdrop: currentStep.onPressBackdrop,
    onPressMask: currentStep.onPressMask,
    animationDuration: currentStep.animationDuration,
    pulse: currentStep.pulse,
    context,
    ...backdrop,
  };

  const Component = currentStep.contentComponent ?? contentComponent;

  return (
    <>
      {currentStep.fullScreen === true ? (
        <AnimatedPressable
          key="fullscreenRect"
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: backdropColor,
            },
            ...(debug ? [{ borderWidth: 1, borderColor: "red" }] : []),
          ]}
          onPress={handlePress(currentStep.onPressBackdrop, context)}
          entering={backdrop.entering}
          exiting={backdrop.exiting}
        />
      ) : (
        <ViewMask {...maskProps} />
      )}

      {Component && (
        <Animated.View
          key={currentStep.identifier}
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}
          entering={content.entering}
          layout={content.layout}
          exiting={content.exiting}
        >
          <Component
            {...currentStep.contentComponentProps}
            step={currentStep}
            ctx={context}
          />
        </Animated.View>
      )}
    </>
  );
};
