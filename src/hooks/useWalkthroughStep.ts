import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import type { LayoutChangeEvent, ReactNativeElement } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { useWalkthrough } from "../context";
import type {
  IOverlayComponentProps,
  IUseWalkthroughStep,
  IUseWalkthroughStepStrict,
  IWalkthroughStep,
  IWalkthroughStepMask,
} from "../types";

export const useWalkthroughStep = <
  P extends IOverlayComponentProps = IOverlayComponentProps,
>({
  fullScreen,
  identifier,
  number,
  ...props
}: IUseWalkthroughStep<P>) => {
  const context = useWalkthrough();

  const { registerStep, allSteps, currentStepNumber, stop, useIsFocused } =
    context;

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
    () => allSteps.find((s) => s.identifier === resolvedIdentifier),
    [resolvedIdentifier, allSteps],
  );

  const propsRef = useRef<IUseWalkthroughStepStrict<P> | null>(null);

  const registerStepWithProps = useCallback(
    (maskProps: IWalkthroughStepMask) => {
      const base = propsRef.current;
      if (base === null) {
        return;
      }
      const { maskAllowInteraction, ...rest } = base;
      const mask: IWalkthroughStepMask = {
        allowInteraction: maskAllowInteraction,
        ...maskProps,
      };

      let step: IWalkthroughStep<P> = {
        ...rest,
        number,
        identifier: resolvedIdentifier,
        overlayComponentKey: resolvedIdentifier,
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
      registerStep(step as unknown as IWalkthroughStep);
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
      number,
      identifier: resolvedIdentifier,
      overlayComponentKey: resolvedIdentifier,
      measureMask: measuredMask,
    };
  });

  const overlayComponentProps = props.overlayComponentProps;

  useEffect(
    () => {
      if (step && overlayComponentProps) {
        registerStep({
          ...step,
          overlayComponentProps,
        });
      }
      // Register only when the overlay props (by value) change; depending on the objects or `step` directly
      // would cause an infinite loop, since re-registering re-renders and re-creates those references.
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(overlayComponentProps || {}),
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

  const { width, height } = useSafeAreaFrame();

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
    ...context,
    isVisible: number === currentStepNumber,
    onLayout,
    onMeasure,
    step,
  };
};
