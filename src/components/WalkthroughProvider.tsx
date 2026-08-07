import sortBy from "lodash/sortBy";
import {
  forwardRef,
  useCallback,
  useEffect,
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
import {
  defaultAnimateNextLayoutChange,
  defaultUseIsFocused,
  enableExperimentalLayoutAnimation,
} from "../utils";
import { WalkthroughDisplayer } from "./WalkthroughDisplayer";

export const WalkthroughProvider = forwardRef<
  IWalkthroughFunctions,
  IWalkthroughProvider
>(
  (
    {
      useIsFocused = defaultUseIsFocused,
      transitionDuration: _transitionDuration = 300,
      backdropColor: _backdropColor = "#000000DA",
      animateNextLayoutChange = defaultAnimateNextLayoutChange,
      enableExperimentalLayoutAnimation: _enableExperimentalLayoutAnimation,
      debug = false,
      children,
    },
    ref,
  ) => {
    const [transitionDuration, setTransitionDuration] =
      useState<number>(_transitionDuration);
    const [backdropColor, setBackdropColor] = useState<string>(_backdropColor);
    const [steps, setSteps] = useState<IWalkthroughStep[]>([]);
    const [currentStepNumber, setCurrentStepNumber] = useState<number>();

    const isWalkthroughOn = typeof currentStepNumber === "number";
    const isReady = useMemo(() => steps.some((s) => s.number === 1), [steps]);

    useEffect(() => {
      if (_enableExperimentalLayoutAnimation === true) {
        enableExperimentalLayoutAnimation();
      }
    }, [_enableExperimentalLayoutAnimation]);

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

    const goTo: IWalkthroughFunctions["goTo"] = setCurrentStepNumber;

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
        goTo,
        setTransitionDuration,
        setBackdropColor,
      }),
      [
        registerStep,
        updateStep,
        start,
        stop,
        next,
        previous,
        goTo,
        setTransitionDuration,
        setBackdropColor,
      ],
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
        animateNextLayoutChange,
        transitionDuration,
        backdropColor,
        useIsFocused,
        isReady,
      }),
      [
        functions,
        isWalkthroughOn,
        currentStepNumber,
        currentSteps,
        steps,
        debug,
        animateNextLayoutChange,
        transitionDuration,
        backdropColor,
        useIsFocused,
        isReady,
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
