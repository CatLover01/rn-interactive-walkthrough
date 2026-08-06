import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useLayoutEffect,
  createContext,
  type ComponentType,
  type ReactNode,
} from "react";
import {
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  type ViewStyle,
  type ReactNativeElement,
  type LayoutChangeEvent,
} from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import sortBy from "lodash/sortBy";

const isAndroid = Platform.OS === "android";

// Convenience method to enable this if it's not already enabled in your app.
// https://reactnative.dev/docs/layoutanimation.html#easeineaseout
const enableExperimentalLayoutAnimation = () => {
  if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface IWalkthroughStepMask {
  x: number;
  y: number;
  width: number;
  height: number;
  allowInteraction?: boolean;
}

interface IWalkthroughFunctions {
  registerStep: (step: IWalkthroughStep) => void;
  updateStep: (
    identifier: IWalkthroughStep["identifier"],
    step: Partial<IWalkthroughStep>,
  ) => void;
  start: () => void;
  stop: () => void;
  next: () => void;
  goTo: (number: number) => void;
  previous: () => void;
  setTransitionDuration: (duration: number) => void;
  setBackdropColor: (color: string) => void;
}

interface IWalkthroughContext extends IWalkthroughFunctions {
  currentSteps: IWalkthroughStep[];
  allSteps: IWalkthroughStep[];
  backdropColor: string;
  transitionDuration: number;
  animateNextLayoutChange: (duration?: number) => void;
  debug: boolean;
  isWalkthroughOn: boolean;
  isReady: boolean;
  currentStepNumber: number | undefined;
  useIsFocused: () => boolean;
}

interface ILayoutAdjustments {
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;

  addX?: number;
  addY?: number;
  addWidth?: number;
  addHeight?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  addPadding?: number;
}

interface IOverlayComponentProps extends IWalkthroughContext {
  step: IWalkthroughStep; // pass through the step as well
}

interface IWalkthroughCallback {
  time: Date;
}

type EnableHardwareBackFunction = (
  props?: Pick<IWalkthroughFunctions, "goTo" | "previous">,
) => void;
type OnPressWithContextType = (context?: IWalkthroughContext) => void;
const WalkthroughContext = createContext<IWalkthroughContext | undefined>(
  undefined,
);
interface IWalkthroughStep<
  P extends IOverlayComponentProps = IOverlayComponentProps,
> {
  number: number;
  identifier: string;
  overlayComponentKey: string;
  overlayComponentProps?: Omit<P, keyof IOverlayComponentProps>;
  OverlayComponent?: ComponentType<P>;
  fullScreen?: boolean;
  layoutAdjustments?: ILayoutAdjustments;
  // Only allow the onLayout to get set once. This is useful on for example, scrollable containers where the position
  // on the page can change when you scroll.
  layoutLock?: boolean;
  enableHardwareBack?: boolean | EnableHardwareBackFunction; // android only - Pass in the step number to go back to that step
  onStart?: (props: IWalkthroughCallback) => void;
  onFinish?: (props: IWalkthroughCallback) => void;
  onBackground?: () => void;
  onPressMask?: OnPressWithContextType;
  onPressBackdrop?: OnPressWithContextType;
  mask: IWalkthroughStepMask;
  computedMask?: IWalkthroughStepMask;
  measureMask: () => void;
}

interface IOverlayProps {
  key: string;
  style: ViewStyle;
  onPress?: OnPressWithContextType;
}

const WalkthroughDisplayer = () => {
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

const defaultAnimateNextLayoutChange = (duration: number | undefined) => {
  LayoutAnimation.configureNext({
    duration: duration ?? 0,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.scaleXY,
    },
  });
};

const defaultUseIsFocused = () => true;

interface IWalkthroughProvider extends Partial<
  Pick<
    IWalkthroughContext,
    | "useIsFocused"
    | "transitionDuration"
    | "backdropColor"
    | "animateNextLayoutChange"
    | "debug"
  >
> {
  enableExperimentalLayoutAnimation?: boolean;
  children?: ReactNode;
}
const WalkthroughProvider = forwardRef<
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

const useWalkthrough = () => {
  const context = useContext(WalkthroughContext);
  if (context === undefined) {
    throw new Error(
      "Make sure that this is called as a child of WalkthroughProvider.",
    );
  }
  return context;
};

type IUseWalkthroughStepStrict<P extends IOverlayComponentProps> = Omit<
  IWalkthroughStep<P>,
  "mask"
> & {
  maskAllowInteraction?: boolean;
};

type IUseWalkthroughStep<P extends IOverlayComponentProps> = PartialBy<
  IUseWalkthroughStepStrict<P>,
  "identifier" | "overlayComponentKey" | "measureMask"
>;

const useWalkthroughStep = <
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

export {
  enableExperimentalLayoutAnimation,
  WalkthroughProvider,
  useWalkthrough,
  useWalkthroughStep,
  type IWalkthroughStepMask,
  type IWalkthroughFunctions,
  type IWalkthroughContext,
  type IOverlayComponentProps,
  type IWalkthroughStep,
  type IWalkthroughProvider,
  type IUseWalkthroughStep,
  type IWalkthroughCallback,
};
