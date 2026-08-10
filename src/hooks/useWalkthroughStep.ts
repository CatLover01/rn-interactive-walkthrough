import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useWindowDimensions } from "react-native";
import type { LayoutChangeEvent, ReactNativeElement } from "react-native";

import { useWalkthrough } from "../context";
import type {
  ContentComponentProps,
  UseWalkthroughStep,
  UseWalkthroughStepStrict,
  WalkthroughStep,
  WalkthroughStepMask,
} from "../types";

export const useWalkthroughStep = <
  P extends ContentComponentProps = ContentComponentProps,
>({
  fullScreen,
  identifier,
  number,
  ...props
}: UseWalkthroughStep<P>) => {
  const { width, height } = useWindowDimensions();
  const { registerStep, steps, currentStepNumber, stop, useIsFocused } =
    useWalkthrough();

  const targetRef = useRef<ReactNativeElement | null>(null);

  const resolvedIdentifier = identifier ?? number.toString();

  // On unmount, make sure to empty the targetRef. It might still be stored in the "steps" on the WalkthroughProvider.
  useEffect(
    () => () => {
      targetRef.current = null;
    },
    [],
  );

  const step = useMemo(
    () => steps.find((s) => s.identifier === resolvedIdentifier),
    [resolvedIdentifier, steps],
  );

  const propsRef = useRef<UseWalkthroughStepStrict<P> | null>(null);

  const registerStepWithProps = useCallback(
    (maskProps: WalkthroughStepMask) => {
      const base = propsRef.current;
      if (base === null) {
        return;
      }
      const { maskAllowInteraction, ...rest } = base;
      const mask: WalkthroughStepMask = {
        allowInteraction: maskAllowInteraction,
        ...maskProps,
      };

      let step: WalkthroughStep<P> = {
        ...rest,
        number,
        identifier: resolvedIdentifier,
        mask,
        computedMask: mask,
      };

      if (step.layoutAdjustments) {
        const la = step.layoutAdjustments;
        step = {
          ...step,
          computedMask: {
            allowInteraction: mask.allowInteraction,
            x: Math.min(
              Math.max(
                la.minX ?? -Number.POSITIVE_INFINITY,
                (la.x ?? step.mask.x) + (la.addX ?? -(la.addPadding ?? 0)),
              ),
              Number.POSITIVE_INFINITY,
            ),
            y: Math.min(
              Math.max(
                la.minY ?? -Number.POSITIVE_INFINITY,
                (la.y ?? step.mask.y) + (la.addY ?? -(la.addPadding ?? 0)),
              ),
              Number.POSITIVE_INFINITY,
            ),
            width:
              (la.width ?? step.mask.width) +
              (la.addWidth ?? (la.addPadding ?? 0) * 2),
            height:
              (la.height ?? step.mask.height) +
              (la.addHeight ?? (la.addPadding ?? 0) * 2),
          },
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      registerStep(step as unknown as WalkthroughStep);
    },
    [registerStep, number, resolvedIdentifier],
  );

  const onMeasure = useCallback(
    (
      _x: number,
      _y: number,
      width: number,
      height: number,
      x: number,
      y: number,
    ) => {
      registerStepWithProps({ width, height, x, y });
    },
    [registerStepWithProps],
  );

  const measuredMask = useCallback(() => {
    const target = targetRef.current;
    if (target === null) {
      return;
    }
    target.measure((_x, _y, width, height, x, y) => {
      if (
        Number.isFinite(x) &&
        Number.isFinite(y) &&
        Number.isFinite(width) &&
        Number.isFinite(height)
      ) {
        const newPosition =
          step &&
          // If component is unmounted, then this will be undefined
          (step.mask.x !== x ||
            step.mask.y !== y ||
            step.mask.width !== width ||
            step.mask.height !== height);

        if (newPosition === true) {
          registerStepWithProps({ width, height, x, y });
        }
      }
    });
  }, [step, registerStepWithProps]);

  useLayoutEffect(() => {
    propsRef.current = {
      ...props,
      fullScreen,
      number,
      identifier: resolvedIdentifier,
      measureMask: measuredMask,
    };
  });

  const contentComponentProps = props.contentComponentProps;

  useEffect(
    () => {
      if (step && contentComponentProps) {
        registerStep({
          ...step,
          contentComponentProps,
        });
      }
      // Register only when the content props (by value) change; depending on the objects or `step` directly
      // would cause an infinite loop, since re-registering re-renders and re-creates those references.
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(contentComponentProps || {}),
  );

  const isFocused = useIsFocused();
  const wasVisibleRef = useRef(false);
  useEffect(() => {
    if (currentStepNumber === number) {
      if (isFocused) {
        wasVisibleRef.current = true;
        // If we had this step visible on a screen, but now for some reason not anymore (maybe they navigated for a notification)
        // then we basically reset the tutorial and stop it so it doesn't stay on the screen as they navigate.
      } else if (wasVisibleRef.current) {
        stop();
      }
      // When the walkthrough is stopped, we need to reset this flag.
    } else if (currentStepNumber === undefined) {
      wasVisibleRef.current = false;
    }
  }, [currentStepNumber, number, isFocused, stop]);

  useEffect(() => {
    if (fullScreen === true && width > 0 && height > 0) {
      // We basically put a line at the bottom of the screen so that we blank out the whole screen.
      registerStepWithProps({ x: 0, y: height, width, height });
    }
  }, [fullScreen, registerStepWithProps, width, height]);

  const layoutLockRef = useRef(false);
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!layoutLockRef.current) {
        const target = event.target;
        targetRef.current = target;
        target.measure(onMeasure);
      }
      layoutLockRef.current = props.layoutLock === true;
    },
    [onMeasure, props.layoutLock],
  );

  return {
    isVisible: number === currentStepNumber,
    onLayout,
    onMeasure,
    step,
  };
};
