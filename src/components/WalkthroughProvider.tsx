import sortBy from "lodash/sortBy";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  type Ref,
} from "react";

import { WalkthroughContext } from "../context";
import type {
  ContentComponentProps,
  WalkthroughContextType,
  WalkthroughFunctions,
  WalkthroughProviderProps,
  WalkthroughStep,
} from "../types";
import { defaultUseIsFocused, getAnimations } from "../utils";
import { WalkthroughDisplayer } from "./WalkthroughDisplayer";

const WalkthroughProviderComponent = <P extends ContentComponentProps>(
  props: WalkthroughProviderProps<P>,
  ref: Ref<WalkthroughFunctions>,
) => {
  const {
    contentComponent,
    transitionDuration: initialDuration = 300,
    animations: userAnimations,
    useIsFocused = defaultUseIsFocused,
    backdropColor: initialBackdropColor = "#000000DA",
    debug = false,
    children,
  } = props;
  const [steps, setSteps] = useState<WalkthroughStep[]>([]);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>();

  const [backdropColor, setBackdropColor] = useState(initialBackdropColor);
  const [transitionDuration, setTransitionDuration] = useState(initialDuration);
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

  const registerStep = useCallback<WalkthroughFunctions["registerStep"]>(
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

  const updateStep = useCallback<WalkthroughFunctions["updateStep"]>(
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

  const next = useCallback<WalkthroughFunctions["next"]>(() => {
    setCurrentStepNumber((x) => (x ?? 0) + 1);
  }, []);

  const previous = useCallback<WalkthroughFunctions["previous"]>(() => {
    setCurrentStepNumber((x) => (x === 0 || x === undefined ? 0 : x - 1));
  }, []);

  const start = useCallback<WalkthroughFunctions["start"]>(() => {
    if (steps.length) {
      const step = steps[0]; // already ordered so take the first one
      setCurrentStepNumber(step.number);
    }
  }, [steps]);

  const stop = useCallback<WalkthroughFunctions["stop"]>(() => {
    setCurrentStepNumber(undefined);
  }, []);

  const functions = useMemo<WalkthroughFunctions>(
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

  const contextValue = useMemo<WalkthroughContextType<P>>(
    () => ({
      ...functions,
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
      contentComponent,
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
      contentComponent,
    ],
  );

  return (
    // The shared context is typed at the default ContentComponentProps, but
    // the provider may hold a narrower P via its generic contentComponent.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    <WalkthroughContext.Provider value={contextValue as WalkthroughContextType}>
      {children}
      {/*@aryk - If we have no steps registered, don't mount the displayer */}
      {Boolean(steps.length) && <WalkthroughDisplayer />}
    </WalkthroughContext.Provider>
  );
};

const WalkthroughProviderWithRef = forwardRef(WalkthroughProviderComponent);
WalkthroughProviderWithRef.displayName = "WalkthroughProvider";

// forwardRef cannot express a generic component, so the render function is
// typed generically and the result narrowed to a generic call signature.
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
export const WalkthroughProvider = WalkthroughProviderWithRef as <
  P extends ContentComponentProps,
>(
  props: WalkthroughProviderProps<P> & { ref?: Ref<WalkthroughFunctions> },
) => ReturnType<typeof WalkthroughProviderComponent>;
