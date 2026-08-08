import type { ComponentType, ReactNode } from "react";
import type { ViewProps } from "react-native";
import type { AnimatedProps } from "react-native-reanimated";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface WalkthroughStepMask {
  x: number;
  y: number;
  width: number;
  height: number;
  allowInteraction?: boolean;
}

export interface WalkthroughFunctions {
  registerStep: (step: WalkthroughStep) => void;
  updateStep: (
    identifier: WalkthroughStep["identifier"],
    step: Partial<WalkthroughStep>,
  ) => void;
  start: () => void;
  stop: () => void;
  next: () => void;
  goTo: (number: number) => void;
  previous: () => void;
  setTransitionDuration: (duration: number) => void;
  setBackdropColor: (color: string) => void;
}

export interface WalkthroughContextType<
  P extends ContentComponentProps = ContentComponentProps,
> extends WalkthroughFunctions {
  currentSteps: WalkthroughStep[];
  steps: WalkthroughStep[];
  backdropColor: string;
  transitionDuration: number;
  debug: boolean;
  isWalkthroughOn: boolean;
  isReady: boolean;
  currentStepNumber: number | undefined;
  animations: WalkthroughLayoutAnimations;
  contentComponent?: ComponentType<P>;
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

export interface ContentComponentProps extends WalkthroughContextType {
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

export interface WalkthroughLayoutAnimations {
  /** Layout animations for the backdrop/pressable */
  backdrop: ComponentLayoutProps;
  /** Layout animations for the step content container */
  content: ComponentLayoutProps;
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
};

export type UseWalkthroughStep<P extends ContentComponentProps> = PartialBy<
  UseWalkthroughStepStrict<P>,
  "identifier" | "contentComponentKey" | "measureMask"
>;

export interface WalkthroughProviderProps<
  P extends ContentComponentProps,
> extends Partial<
  Pick<
    WalkthroughContextType<P>,
    | "useIsFocused"
    | "contentComponent"
    | "transitionDuration"
    | "backdropColor"
    | "debug"
    | "animations"
  >
> {
  children?: ReactNode;
}
