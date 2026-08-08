import sortBy from "lodash/sortBy";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  StyleSheet,
  BackHandler,
  type ViewStyle,
  Pressable,
} from "react-native";
import Animated from "react-native-reanimated";

import { useWalkthrough } from "../context";
import { useKeyboard } from "../hooks/useKeyboard";
import type {
  EnableHardwareBackFunction,
  WalkthroughStep,
  OnPressWithContextType,
} from "../types";
import { isAndroid } from "../utils";

interface IOverlayProps {
  key: string;
  style: ViewStyle;
  onPress?: OnPressWithContextType;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const WalkthroughDisplayer = () => {
  const context = useWalkthrough();
  const {
    currentSteps,
    currentStepNumber,
    backdropColor,
    isWalkthroughOn,
    previous,
    goTo,
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

  const lastStepsRef = useRef<WalkthroughStep[]>([]);

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
    const sortedCurrentSteps: WalkthroughStep[] = sortBy(
      currentSteps,
      (step) => step.mask.y,
    );
    const arr: IOverlayProps[] = [];
    let markerY = 0;

    sortedCurrentSteps.forEach((step, i) => {
      const computedMask = step.computedMask ?? step.mask;

      // Rectangle on the top.
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
      // Rectangle on the left side.
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
      // Rectangle on the right side.
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
      // The bottom rectangle up to the next component (or bottom of the screen)
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
      {overlayProps.map(({ key, onPress, style }) => (
        <AnimatedPressable
          key={key}
          layout={backdrop.layout}
          style={[style, { position: "absolute" }]}
          onPress={
            onPress
              ? () => {
                  onPress(context);
                }
              : undefined
          }
          entering={backdrop.entering}
          exiting={backdrop.exiting}
        />
      ))}

      {currentSteps.map((s) => {
        const Component = s.contentComponent ?? contentComponent;
        if (!Component) return null;
        return (
          <Animated.View
            key={s.contentComponentKey}
            pointerEvents="box-none"
            style={StyleSheet.absoluteFill}
            entering={content.entering}
            layout={content.layout}
            exiting={content.exiting}
          >
            <Component step={s} {...s.contentComponentProps} {...context} />
          </Animated.View>
        );
      })}
    </>
  );
};
