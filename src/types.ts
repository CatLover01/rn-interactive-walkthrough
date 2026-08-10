import type { ComponentType } from "react";
import type { ViewProps } from "react-native";
import type {
  AnimatedProps,
  EasingFunction,
  EasingFunctionFactory,
} from "react-native-reanimated";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface WalkthroughStepMask {
  x: number;
  y: number;
  width: number;
  height: number;
  allowInteraction?: boolean;
  /** Round the corners of the hole. The backdrop fills the area outside the rounded corners. */
  borderRadius?: number;
}

export interface WalkthroughContextType<
  P extends ContentComponentProps = ContentComponentProps,
> {
  currentStep: WalkthroughStep | undefined;
  currentStepNumber: number | undefined;
  steps: WalkthroughStep[];
  isFirstStep: boolean;
  isLastStep: boolean;
  isReady: boolean;
  isActive: boolean;
  debug: boolean;
  backdropColor: string;
  animationDuration: number;
  animations: WalkthroughLayoutAnimations;
  contentComponent?: ComponentType;
  registerStep: (step: WalkthroughStep) => void;
  updateStep: (
    identifier: WalkthroughStep["identifier"],
    step: Partial<P>,
  ) => void;
  start: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  goTo: (number: number) => void;
  useIsFocused: () => boolean;
}

export interface LayoutAdjustments {
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

export interface ContentComponentProps {
  ctx: WalkthroughContextType;
  step: WalkthroughStep;
}

export interface WalkthroughCallback {
  time: Date;
}

export type OnPressWithContextType = (context?: WalkthroughContextType) => void;

export type ComponentLayoutProps = Pick<
  AnimatedProps<ViewProps>,
  "entering" | "exiting" | "layout"
>;

/** Easing curve applied to the mask transition between steps. */
export type WalkthroughEasing = EasingFunction | EasingFunctionFactory;

/** Position of a mask in screen coordinates. */
export type WalkthroughMaskCoordinates = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface WalkthroughBackdropAnimations {
  /** Enter/exits for the backdrop pressables */
  entering: ComponentLayoutProps["entering"];
  exiting: ComponentLayoutProps["exiting"];
  /** Easing curve for the mask transition between steps */
  easing: WalkthroughEasing;
}

export interface WalkthroughLayoutAnimations {
  /** Animations for the backdrop/pressable */
  backdrop: WalkthroughBackdropAnimations;
  /** Layout animations for the step content container */
  content: ComponentLayoutProps;
}

/** The `animations` prop accepts partial overrides of any subset. */
export type PartialWalkthroughLayoutAnimations = {
  backdrop?: Partial<WalkthroughBackdropAnimations>;
  content?: Partial<ComponentLayoutProps>;
};

/** Props for the backdrop mask. */
export interface WalkthroughMaskProps
  extends
    Pick<WalkthroughStep, "mask" | "onPressBackdrop" | "onPressMask">,
    Partial<WalkthroughBackdropAnimations> {
  context: WalkthroughContextType;
}

export interface WalkthroughStep<
  P extends ContentComponentProps = ContentComponentProps,
> {
  number: number;
  identifier: string;
  contentComponentKey: string;
  contentComponentProps?: Omit<P, keyof ContentComponentProps>;
  contentComponent?: ComponentType<P>;
  fullScreen?: boolean;
  layoutAdjustments?: LayoutAdjustments;
  // Only allow the onLayout to get set once. This is useful on for example, scrollable containers where the position
  // on the page can change when you scroll.
  layoutLock?: boolean;
  onStart?: (props: WalkthroughCallback) => void;
  onFinish?: (props: WalkthroughCallback) => void;
  onBackground?: () => void;
  onPressMask?: OnPressWithContextType;
  onPressBackdrop?: OnPressWithContextType;
  mask: WalkthroughStepMask;
  computedMask?: WalkthroughStepMask;
  measureMask: () => void;
}

export type UseWalkthroughStepStrict<P extends ContentComponentProps> = Omit<
  WalkthroughStep<P>,
  "mask"
> & {
  maskAllowInteraction?: boolean;
  /** Round the corners of the hole. The backdrop fills the area outside the rounded corners. */
  maskBorderRadius?: number;
};

export type UseWalkthroughStep<P extends ContentComponentProps> = PartialBy<
  UseWalkthroughStepStrict<P>,
  "identifier" | "contentComponentKey" | "measureMask"
>;

export interface WalkthroughOptions<
  P extends ContentComponentProps,
> extends Partial<
  Pick<
    WalkthroughContextType<P>,
    | "useIsFocused"
    | "contentComponent"
    | "animationDuration"
    | "backdropColor"
    | "debug"
  >
> {
  animations?: PartialWalkthroughLayoutAnimations;
}
