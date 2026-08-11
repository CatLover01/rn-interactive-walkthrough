import sortBy from "lodash/sortBy";
import { useCallback, useMemo, useState, type PropsWithChildren } from "react";

import { WalkthroughContext } from "../context";
import type {
  ContentComponentProps,
  WalkthroughContextType,
  WalkthroughOptions,
  WalkthroughStep,
} from "../types";
import { defaultUseIsFocused, getMergedAnimations } from "../utils";
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
  layoutAdjustments,
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

  const isLastStep = useMemo(
    () => currentStepNumber === steps.length,
    [currentStepNumber, steps],
  );

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
    setCurrentStepNumber((x) => (x ?? 0) + 1);
  }, []);

  const previous = useCallback<WalkthroughContextType["previous"]>(() => {
    setCurrentStepNumber((x) => (x === 0 || x === undefined ? 0 : x - 1));
  }, []);

  const start = useCallback<WalkthroughContextType["start"]>(() => {
    if (steps.length) {
      const step = steps[0]; // already ordered so take the first one
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
      layoutAdjustments,
      contentComponent,
      registerStep,
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
      layoutAdjustments,
      contentComponent,
      registerStep,
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
