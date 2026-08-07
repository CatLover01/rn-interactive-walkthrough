import sortBy from "lodash/sortBy";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  BackHandler,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from "react-native";

import { WalkthroughContext } from "../context";
import { useKeyboard } from "../hooks/useKeyboard";
import type {
  EnableHardwareBackFunction,
  IWalkthroughStep,
  OnPressWithContextType,
} from "../types";
import { isAndroid } from "../utils";

interface IOverlayProps {
  key: string;
  style: ViewStyle;
  onPress?: OnPressWithContextType;
}

export const WalkthroughDisplayer = () => {
  const context = useContext(WalkthroughContext)!;
  const {
    currentSteps,
    currentStepNumber,
    backdropColor,
    transitionDuration,
    animateNextLayoutChange,
    isWalkthroughOn,
    previous,
    goTo,
    debug,
  } = context;

  const logStep = useCallback(
    (number: number, str: string) => {
      if (debug) {
        console.log(`[WT][${String(number)}]: ${str}`);
      }
    },
    [debug],
  );

  const lastStepsRef = useRef<IWalkthroughStep[]>([]);

  const isKeyboardOpen = useKeyboard();

  const onHardwareBackPress = useCallback(() => {
    if (isKeyboardOpen) {
      return false;
    } else {
      const backEnabled = currentSteps.filter((s) =>
        Boolean(s.enableHardwareBack),
      );
      if (backEnabled.length) {
        let functions = backEnabled
          .map((s) => s.enableHardwareBack)
          .filter(
            (x): x is EnableHardwareBackFunction => typeof x === "function",
          );
        if (!functions.length) {
          functions = [
            () => {
              previous();
            },
          ];
        }
        functions.forEach((f) => {
          f({ goTo, previous });
        });
      }

      return true; // return true to block the back button which we always do when the walkthrough is on.
    }
  }, [isKeyboardOpen, currentSteps, previous, goTo]);

  useEffect(() => {
    if (!isAndroid || !isWalkthroughOn) {
      return;
    }
    // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onHardwareBackPress,
    );
    return () => {
      subscription.remove();
    };
  }, [isWalkthroughOn, onHardwareBackPress]);

  const currentStepsKey = currentSteps.map((s) => s.identifier).join("|");

  useLayoutEffect(
    () => {
      const time = new Date();
      // Only mark finish if we are advancing to the next step (going backwards doesn't count as marking off this step).
      // Or if we are at the end and currentStepNumber is undefined
      if (
        lastStepsRef.current.length &&
        (typeof currentStepNumber !== "number" ||
          lastStepsRef.current[0].number < currentStepNumber)
      ) {
        logStep(
          lastStepsRef.current[0].number,
          `Finished at ${String(time.getTime())}`,
        );
        lastStepsRef.current.forEach((step) => {
          step.onFinish?.({ time });
        });
      }

      if (currentSteps.length) {
        animateNextLayoutChange(transitionDuration);

        logStep(currentStepNumber ?? 0, `Started at ${String(time.getTime())}`);
        currentSteps.forEach((step) => {
          step.onStart?.({ time });
          step.measureMask();
        });
      }

      lastStepsRef.current = currentSteps;
    },
    // Need to do it based on currentSteps, since that changes when screens mount and things get added to the steps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStepsKey],
  );

  const overlayProps = useMemo(() => {
    // We build the views from top to bottom
    const sortedCurrentSteps: IWalkthroughStep[] = sortBy(
      currentSteps,
      (step) => step.mask.y,
    );
    const arr: IOverlayProps[] = [];
    let markerY = 0;

    sortedCurrentSteps.forEach((step, i) => {
      const computedMask = step.computedMask ?? step.mask;

      // Rectange on the top across the whole screen
      arr.push({
        key: `topRect-${String(i)}`,
        onPress: step.onPressBackdrop,
        style: {
          backgroundColor: backdropColor,
          top: markerY,
          left: 0,
          right: 0,
          height: computedMask.y - markerY,
          ...(debug ? { borderWidth: 1, borderColor: "red" } : {}),
        },
      });
      // Rectange on the left side.
      arr.push({
        key: `leftRect-${String(i)}`,
        onPress: step.onPressBackdrop,
        style: {
          backgroundColor: backdropColor,
          top: computedMask.y,
          left: 0,
          width: computedMask.x,
          height: computedMask.height,
          ...(debug ? { borderWidth: 1, borderColor: "blue" } : {}),
        },
      });
      // Rectange on the right side.
      arr.push({
        key: `rightRect-${String(i)}`,
        onPress: step.onPressBackdrop,
        style: {
          backgroundColor: backdropColor,
          top: computedMask.y,
          left: computedMask.x + computedMask.width,
          right: 0,
          height: computedMask.height,
          ...(debug ? { borderWidth: 1, borderColor: "green" } : {}),
        },
      });
      // The bottom rectange up to the next component (or bottom of the screen)
      const nextStep =
        i + 1 < sortedCurrentSteps.length
          ? sortedCurrentSteps[i + 1]
          : undefined;
      if (!nextStep) {
        const top = computedMask.y + computedMask.height;
        arr.push({
          // We only have one of these (at the end) so want to give this the same key so it can be reused in the animation.
          key: `bottomRect`,
          onPress: step.onPressBackdrop,
          style: {
            backgroundColor: backdropColor,
            top,
            left: 0,
            right: 0,
            bottom: 0,
            ...(debug ? { borderWidth: 1, borderColor: "orange" } : {}),
          },
        });
      }

      // If we aren't allowing interaction on the highlighted region, then just put a view over that as well so its not pressable.
      if (computedMask.allowInteraction !== true) {
        arr.push({
          key: `coverRect-${String(i)}`,
          onPress: step.onPressMask,
          style: {
            top: computedMask.y,
            left: computedMask.x,
            width: computedMask.width,
            height: computedMask.height,
            // on Android (not sure if all), if we have an empty View without a background, it will not take the
            // touchevents. Rather then experimenting with wrapping it with TouchableWithoutFeedback, etc, we simply
            // give it an *extremely* subtle background that's essentially not noticeable. This helps it steal the touch events.
            ...(isAndroid
              ? { backgroundColor: "#FFFFFF01", opacity: 0.1 }
              : {}),
            // Add a background color so in testing you can see that there is something over it.
            ...(debug
              ? {
                  borderWidth: 1,
                  borderColor: "forestgreen",
                  backgroundColor: "#0000FF33",
                }
              : {}),
          },
        });
      }
      markerY = computedMask.y + computedMask.height;
    });
    return arr;
  }, [currentSteps, backdropColor, debug]);

  return (
    <>
      {overlayProps.map(({ key, onPress, style }) => {
        let content = (
          <View key={key} style={[style, { position: "absolute" }]} />
        );

        if (onPress) {
          content = (
            <TouchableWithoutFeedback
              key={key}
              onPress={() => {
                onPress(context);
              }}
            >
              {content}
            </TouchableWithoutFeedback>
          );
        }

        return content;
      })}
      {currentSteps.map((s) =>
        s.OverlayComponent ? (
          <s.OverlayComponent
            key={s.overlayComponentKey}
            step={s}
            {...s.overlayComponentProps}
            {...context}
          />
        ) : null,
      )}
    </>
  );
};
