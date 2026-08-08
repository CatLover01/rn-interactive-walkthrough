import type { ComponentType, ReactNode } from "react";
import type { ViewProps } from "react-native";
import type { AnimatedProps } from "react-native-reanimated";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IWalkthroughStepMask {
  x: number;
  y: number;
  width: number;
  height: number;
  allowInteraction?: boolean;
}

export interface IWalkthroughFunctions {
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

export interface IWalkthroughContext extends IWalkthroughFunctions {
  currentSteps: IWalkthroughStep[];
  steps: IWalkthroughStep[];
  backdropColor: string;
  transitionDuration: number;
  debug: boolean;
  isWalkthroughOn: boolean;
  isReady: boolean;
  currentStepNumber: number | undefined;
  animations: WalkthroughLayoutAnimations;
  useIsFocused: () => boolean;
}

export interface ILayoutAdjustments {
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

export interface IOverlayComponentProps extends IWalkthroughContext {
  step: IWalkthroughStep; // pass through the step as well
}

export interface IWalkthroughCallback {
  time: Date;
}

export type EnableHardwareBackFunction = (
  props?: Pick<IWalkthroughFunctions, "goTo" | "previous">,
) => void;
export type OnPressWithContextType = (context?: IWalkthroughContext) => void;

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

export interface IWalkthroughStep<
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

export type IUseWalkthroughStepStrict<P extends IOverlayComponentProps> = Omit<
  IWalkthroughStep<P>,
  "mask"
> & {
  maskAllowInteraction?: boolean;
};

export type IUseWalkthroughStep<P extends IOverlayComponentProps> = PartialBy<
  IUseWalkthroughStepStrict<P>,
  "identifier" | "overlayComponentKey" | "measureMask"
>;

export interface IWalkthroughProvider extends Partial<
  Pick<
    IWalkthroughContext,
    "useIsFocused" | "transitionDuration" | "backdropColor" | "debug"
  >
> {
  animations?: Partial<WalkthroughLayoutAnimations>;
  children?: ReactNode;
}
