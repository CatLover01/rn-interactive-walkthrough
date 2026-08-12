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
  WalkthroughMaskCoordinates,
  WalkthroughStepType,
  WalkthroughStepMask,
} from "../types";

/**
 * Registers a walkthrough step and tracks the mask of the view it should
 * highlight.
 *
 * Attach the returned `onLayout` to the target view: the hook measures it and
 * registers a step whose {@link WalkthroughStepType.mask} matches the measured
 * rectangle (adjusted by {@link WalkthroughStepType.layoutAdjustments}). When the
 * step is active, its content component renders above the mask.
 *
 * The step is re-registered (upserted by {@link WalkthroughStepType.identifier})
 * whenever its target moves, as long as {@link WalkthroughStepType.layoutLock} is
 * not set.
 * */
export const useWalkthroughStep = <
  P extends ContentComponentProps = ContentComponentProps,
>({
  fullScreen,
  identifier,
  number,
  ...props
}: UseWalkthroughStep<P>) => {
  const { width, height } = useWindowDimensions();
  const {
    registerStep,
    unregisterStep,
    steps,
    currentStepNumber,
    stop,
    useIsFocused,
    layoutAdjustments,
    maskAllowInteraction: providerMaskAllowInteraction,
  } = useWalkthrough();

  const targetRef = useRef<ReactNativeElement | null>(null);

  const resolvedIdentifier = identifier ?? number.toString();

  // On unmount, make sure to empty the targetRef and remove the step. It
  // might still be stored in the "steps" on the WalkthroughProvider.
  useEffect(
    () => () => {
      targetRef.current = null;
      unregisterStep(resolvedIdentifier);
    },
    [resolvedIdentifier, unregisterStep],
  );

  const step = useMemo(
    () => steps.find((s) => s.identifier === resolvedIdentifier),
    [resolvedIdentifier, steps],
  );

  const propsRef = useRef<UseWalkthroughStepStrict<P> | null>(null);

  const registerStepWithProps = useCallback(
    (maskProps: WalkthroughMaskCoordinates) => {
      const base = propsRef.current;
      if (base === null) {
        return;
      }
      const { maskAllowInteraction, ...rest } = base;
      const mask: WalkthroughStepMask = {
        allowInteraction: maskAllowInteraction ?? providerMaskAllowInteraction,
        ...maskProps,
      };

      let step: WalkthroughStepType<P> = {
        ...rest,
        number,
        identifier: resolvedIdentifier,
        mask,
        computedMask: mask,
      };

      if (layoutAdjustments || step.layoutAdjustments) {
        const la = { ...layoutAdjustments, ...step.layoutAdjustments };
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
      registerStep(step as unknown as WalkthroughStepType);
    },
    [
      registerStep,
      number,
      resolvedIdentifier,
      layoutAdjustments,
      providerMaskAllowInteraction,
    ],
  );

  const onMeasure = useCallback(
    (x: number, y: number, width: number, height: number) => {
      registerStepWithProps({ width, height, x, y });
    },
    [registerStepWithProps],
  );

  // Latest registered step for this hook. `measureMask` may be stored on the
  // step by the provider from an earlier render, so reading the step through a
  // ref keeps that closure from capturing a stale value.
  const stepRef = useRef<WalkthroughStepType | undefined>(undefined);
  stepRef.current = step;

  const measuredMask = useCallback(() => {
    const target = targetRef.current;
    if (target === null) {
      return;
    }
    target.measureInWindow((x, y, width, height) => {
      if (
        Number.isFinite(x) &&
        Number.isFinite(y) &&
        Number.isFinite(width) &&
        Number.isFinite(height)
      ) {
        const currentStep = stepRef.current;
        const newPosition =
          currentStep &&
          // If component is unmounted, then this will be undefined
          (currentStep.mask.x !== x ||
            currentStep.mask.y !== y ||
            currentStep.mask.width !== width ||
            currentStep.mask.height !== height);

        if (newPosition === true) {
          registerStepWithProps({ width, height, x, y });
        }
      }
    });
  }, [registerStepWithProps]);

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
      const target = event.target;
      targetRef.current = target;
      if (!layoutLockRef.current) {
        target.measureInWindow(onMeasure);
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
