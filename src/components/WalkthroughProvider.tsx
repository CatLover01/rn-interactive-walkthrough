import sortBy from "lodash/sortBy";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { WalkthroughContext } from "../context";
import type {
  IWalkthroughContext,
  IWalkthroughFunctions,
  IWalkthroughProvider,
  IWalkthroughStep,
} from "../types";
import { defaultUseIsFocused, getAnimations } from "../utils";
import { WalkthroughDisplayer } from "./WalkthroughDisplayer";

export const WalkthroughProvider = forwardRef<
  IWalkthroughFunctions,
  IWalkthroughProvider
>(
  (
    {
      transitionDuration: initialDuration = 300,
      animations: userAnimations,
      useIsFocused = defaultUseIsFocused,
      backdropColor: initialBackdropColor = "#000000DA",
      debug = false,
      children,
    },
    ref,
  ) => {
    const [steps, setSteps] = useState<IWalkthroughStep[]>([]);
    const [currentStepNumber, setCurrentStepNumber] = useState<number>();

    const [backdropColor, setBackdropColor] = useState(initialBackdropColor);
    const [transitionDuration, setTransitionDuration] =
      useState(initialDuration);
    const animations = useMemo(
      () => getAnimations(userAnimations, transitionDuration),
      [userAnimations, transitionDuration],
    );

    const isWalkthroughOn = typeof currentStepNumber === "number";
    const isReady = useMemo(() => steps.some((s) => s.number === 1), [steps]);

    const currentSteps = useMemo(
      () =>
        isWalkthroughOn
          ? steps.filter((s) => s.number === currentStepNumber)
          : [],
      [isWalkthroughOn, currentStepNumber, steps],
    );

    const registerStep = useCallback<IWalkthroughFunctions["registerStep"]>(
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

    const updateStep = useCallback<IWalkthroughFunctions["updateStep"]>(
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

    const next = useCallback<IWalkthroughFunctions["next"]>(() => {
      setCurrentStepNumber((x) => (x ?? 0) + 1);
    }, []);

    const previous = useCallback<IWalkthroughFunctions["previous"]>(() => {
      setCurrentStepNumber((x) => (x === 0 || x === undefined ? 0 : x - 1));
    }, []);

    const start = useCallback<IWalkthroughFunctions["start"]>(() => {
      if (steps.length) {
        const step = steps[0]; // already ordered so take the first one
        setCurrentStepNumber(step.number);
      }
    }, [steps]);

    const stop = useCallback<IWalkthroughFunctions["stop"]>(() => {
      setCurrentStepNumber(undefined);
    }, []);

    const functions = useMemo<IWalkthroughFunctions>(
      () => ({
        registerStep,
        updateStep,
        start,
        stop,
        next,
        previous,
        goTo: setCurrentStepNumber,
        setTransitionDuration,
        setBackdropColor,
      }),
      [registerStep, updateStep, start, stop, next, previous],
    );

    useImperativeHandle(ref, () => functions);

    const contextValue = useMemo<IWalkthroughContext>(
      () => ({
        ...functions,
        isWalkthroughOn,
        currentStepNumber,
        currentSteps,
        allSteps: steps, // want to be called "allSteps" so doesn't sound too close to "step".
        debug,
        transitionDuration,
        backdropColor,
        useIsFocused,
        isReady,
        animations,
      }),
      [
        functions,
        isWalkthroughOn,
        currentStepNumber,
        currentSteps,
        steps,
        debug,
        transitionDuration,
        backdropColor,
        useIsFocused,
        isReady,
        animations,
      ],
    );

    return (
      <WalkthroughContext.Provider value={contextValue}>
        {children}
        {/*@aryk - If we have no steps registered, don't mount the displayer */}
        {Boolean(steps.length) && <WalkthroughDisplayer />}
      </WalkthroughContext.Provider>
    );
  },
);
WalkthroughProvider.displayName = "WalkthroughProvider";
