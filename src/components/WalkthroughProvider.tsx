import sortBy from "lodash/sortBy";
import { useCallback, useMemo, useState, type PropsWithChildren } from "react";

import { WalkthroughContext } from "../context";
import type {
  ContentComponentProps,
  WalkthroughContextType,
  WalkthroughOptions,
  WalkthroughStep,
} from "../types";
import {
  defaultUseIsFocused,
  getMergedAnimations,
  getMergedPulse,
} from "../utils";
import { WalkthroughDisplayer } from "./WalkthroughDisplayer";

/**
 * Wraps your app and provides the walkthrough to all consumers through
 * {@link useWalkthrough}.
 *
 * Renders the overlay (backdrop, mask and step content) on top of its
 * children, and exposes the shared state (current step, progress) plus the
 * actions to drive the walkthrough. See {@link WalkthroughOptions} for the
 * accepted props.
 * */
export const WalkthroughProvider = <P extends ContentComponentProps>({
  contentComponent,
  animationDuration = 300,
  animations: initialAnimations,
  pulse: initialPulse,
  layoutAdjustments,
  maskAllowInteraction = false,
  useIsFocused = defaultUseIsFocused,
  backdropColor = "#000000DA",
  debug = false,
  children,
}: PropsWithChildren<WalkthroughOptions<P>>) => {
  const [steps, setSteps] = useState<WalkthroughStep[]>([]);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>();

  const animations = useMemo(
    () => getMergedAnimations(initialAnimations, animationDuration),
    [initialAnimations, animationDuration],
  );

  const pulse = useMemo(() => getMergedPulse(initialPulse), [initialPulse]);

  const isActive = typeof currentStepNumber === "number";
  const isReady = useMemo(() => steps.some((s) => s.number === 1), [steps]);

  const currentStep = useMemo(
    () =>
      isActive ? steps.find((s) => s.number === currentStepNumber) : undefined,
    [isActive, currentStepNumber, steps],
  );

  const isFirstStep = useMemo(
    () => currentStepNumber === 1,
    [currentStepNumber],
  );

  const isLastStep = useMemo(() => {
    if (!isActive) {
      return false;
    }
    const lastStep = steps[steps.length - 1];
    return lastStep.number === currentStepNumber;
  }, [isActive, currentStepNumber, steps]);

  const registerStep = useCallback<WalkthroughContextType["registerStep"]>(
    (step) => {
      setSteps((steps) =>
        sortBy(
          [step, ...steps.filter((s) => s.identifier !== step.identifier)],
          "number",
        ),
      );
    },
    [],
  );

  const unregisterStep = useCallback<WalkthroughContextType["unregisterStep"]>(
    (identifier) => {
      setSteps((steps) => steps.filter((s) => s.identifier !== identifier));
    },
    [],
  );

  const updateStep = useCallback<WalkthroughContextType["updateStep"]>(
    (identifier, step) => {
      setSteps((steps) => {
        const oldStep = steps.find((s) => s.identifier === identifier);
        if (oldStep === undefined) {
          return steps;
        }
        return sortBy(
          [
            { ...oldStep, ...step },
            ...steps.filter((s) => s.identifier !== identifier),
          ],
          "number",
        );
      });
    },
    [],
  );

  const next = useCallback<WalkthroughContextType["next"]>(() => {
    setCurrentStepNumber((x) => {
      if (x === undefined) {
        return x;
      }
      const index = steps.findIndex((s) => s.number === x);
      if (index === -1 || index >= steps.length - 1) {
        // Unknown step, or already on the last one: end the walkthrough rather
        // than drifting to a non-existent step number.
        return undefined;
      }
      return steps[index + 1].number;
    });
  }, [steps]);

  const previous = useCallback<WalkthroughContextType["previous"]>(() => {
    setCurrentStepNumber((x) => {
      if (x === undefined) {
        return x;
      }

      const index = steps.findIndex((s) => s.number === x);
      if (index <= 0) {
        // Unknown step, or already on the first one
        return x;
      }
      return steps[index - 1].number;
    });
  }, [steps]);

  const start = useCallback<WalkthroughContextType["start"]>(() => {
    if (steps.length) {
      const step = steps[0];
      setCurrentStepNumber(step.number);
    }
  }, [steps]);

  const stop = useCallback<WalkthroughContextType["stop"]>(() => {
    setCurrentStepNumber(undefined);
  }, []);

  const contextValue = useMemo<WalkthroughContextType<P>>(
    () => ({
      currentStep,
      currentStepNumber,
      steps,
      isFirstStep,
      isLastStep,
      isReady,
      isActive,
      debug,
      backdropColor,
      animationDuration,
      animations,
      pulse,
      layoutAdjustments,
      maskAllowInteraction,
      contentComponent,
      registerStep,
      unregisterStep,
      updateStep,
      start,
      stop,
      next,
      previous,
      goTo: setCurrentStepNumber,
      useIsFocused,
    }),
    [
      currentStep,
      currentStepNumber,
      steps,
      isFirstStep,
      isLastStep,
      isReady,
      isActive,
      debug,
      backdropColor,
      animationDuration,
      animations,
      pulse,
      layoutAdjustments,
      maskAllowInteraction,
      contentComponent,
      registerStep,
      unregisterStep,
      updateStep,
      start,
      stop,
      next,
      previous,
      useIsFocused,
    ],
  );

  return (
    // The shared context is typed at the default ContentComponentProps, but
    // the provider may hold a narrower P via its generic contentComponent.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    <WalkthroughContext.Provider value={contextValue as WalkthroughContextType}>
      {children}
      <WalkthroughDisplayer />
    </WalkthroughContext.Provider>
  );
};
