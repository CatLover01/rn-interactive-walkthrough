import type { ComponentType } from "react";
import type { ViewProps } from "react-native";
import type {
  AnimatedProps,
  EasingFunction,
  EasingFunctionFactory,
} from "react-native-reanimated";

/**
 * The rectangle of the highlighted target, in screen coordinates.
 *
 * A step uses this to tell the {@link WalkthroughProvider} where its target
 * view sits so the mask can be drawn around it. It is normally produced by the
 * hook by measuring the view, but can be supplied by hand, see
 * {@link WalkthroughStep.mask}.
 * */
export interface WalkthroughStepMask {
  /** The x coordinate (in dp) of the target's top-left corner. */
  x: number;
  /** The y coordinate (in dp) of the target's top-left corner. */
  y: number;
  /** The width (in dp) of the target. */
  width: number;
  /** The height (in dp) of the target. */
  height: number;
  /**
   * Whether touches inside the mask should pass through to the target view
   * instead of being swallowed by the walkthrough overlay.
   * */
  allowInteraction: boolean;
}

/**
 * The context made available to every consumer through {@link useWalkthrough},
 * and passed to every content component as {@link ContentComponentProps.ctx}.
 *
 * It exposes the current state of the walkthrough (current step, progress) and
 * the actions to drive it (start, stop, next, previous...).
 * */
export interface WalkthroughContextType<
  P extends ContentComponentProps = ContentComponentProps,
> {
  /** The step currently being displayed, or `undefined` when inactive. */
  currentStep: WalkthroughStep | undefined;
  /** The number of the current step, or `undefined` when inactive. */
  currentStepNumber: number | undefined;
  /** All registered steps, sorted by {@link WalkthroughStep.number}. */
  steps: WalkthroughStep[];
  /** Whether the current step is the first one (`number === 1`). */
  isFirstStep: boolean;
  /** Whether the current step is the last registered one. */
  isLastStep: boolean;
  /** Whether a step with `number === 1` is registered, so `start()` can run. */
  isReady: boolean;
  /** Whether the walkthrough is currently running (a step is active). */
  isActive: boolean;
  /** Whether debug logging is enabled, from {@link WalkthroughOptions.debug}. Defaults to `false`. */
  debug: boolean;
  /** The color of the backdrop behind the mask, from {@link WalkthroughOptions.backdropColor}. Defaults to `"#000000DA"`. */
  backdropColor: string;
  /** The base duration (in ms) used by the default {@link animations}. Defaults to `300`. */
  animationDuration: number;
  /** The merged animation configuration used by the displayer. */
  animations: WalkthroughLayoutAnimations;
  /** Adjusts the measured mask, e.g. to add padding. */
  layoutAdjustments?: LayoutAdjustments;
  /** Whether touches inside the mask should pass through to the target view. Defaults to `false`. */
  maskAllowInteraction: boolean;
  /**
   * The fallback content component used by steps that don't specify their own
   * {@link WalkthroughStep.contentComponent}. See {@link WalkthroughOptions.contentComponent}.
   * */
  contentComponent?: ComponentType<P>;
  /**
   * Registers a step, replacing any previously registered step with the same
   * {@link WalkthroughStep.identifier}. This is the upsert used by
   * {@link useWalkthroughStep}.
   * */
  registerStep: (step: WalkthroughStep) => void;
  /**
   * Merges the given partial props into the step identified by
   * {@link WalkthroughStep.identifier}, if it is registered. Does nothing if no
   * step matches.
   * */
  updateStep: (
    identifier: WalkthroughStep["identifier"],
    step: Partial<P>,
  ) => void;
  /** Starts the walkthrough from the first registered step. */
  start: () => void;
  /** Stops the walkthrough and hides the overlay. */
  stop: () => void;
  /** Advances to the next step (or stays put on the last one). */
  next: () => void;
  /** Goes back to the previous step. */
  previous: () => void;
  /** Jumps directly to the step with the given number. */
  goTo: (number: number) => void;
  /**
   * A hook used to determine whether the current screen is focused. Can be
   * overridden through {@link WalkthroughOptions.useIsFocused}. Defaults to a
   * hook that always returns `true`.
   * */
  useIsFocused: () => boolean;
}

/**
 * Adjustments applied on top of a measured {@link WalkthroughStepMask} to tweak
 * where the mask ends up, e.g. to add padding around the target or to clamp it
 * to the screen. See {@link useWalkthroughStep}.
 * */
export interface LayoutAdjustments {
  /** The minimum x the computed mask may have. */
  minX?: number;
  /** The minimum y the computed mask may have. */
  minY?: number;
  /** The maximum x the computed mask may have. */
  maxX?: number;
  /** The maximum y the computed mask may have. */
  maxY?: number;
  /** Adds to (or subtracts from) the mask's x. */
  addX?: number;
  /** Adds to (or subtracts from) the mask's y. */
  addY?: number;
  /** Adds to (or subtracts from) the mask's width. */
  addWidth?: number;
  /** Adds to (or subtracts from) the mask's height. */
  addHeight?: number;
  /** Overrides the mask's x entirely. */
  x?: number;
  /** Overrides the mask's y entirely. */
  y?: number;
  /** Overrides the mask's width entirely. */
  width?: number;
  /** Overrides the mask's height entirely. */
  height?: number;
  /** Shorthand for adding padding on all sides of the mask. */
  addPadding?: number;
}

/**
 * The props injected into every content component (like the example `Tooltip`).
 *
 * A content component is a React component that receives {@link ctx} and
 * {@link step}, plus any `contentComponentProps` the step configured. It is
 * rendered above the mask by the {@link WalkthroughProvider}.
 * */
export interface ContentComponentProps {
  /** The walkthrough context. */
  ctx: WalkthroughContextType;
  /** The step currently being displayed. */
  step: WalkthroughStep;
}

/**
 * The payload of the step lifecycle callbacks, {@link WalkthroughStep.onStart}
 * and {@link WalkthroughStep.onFinish}.
 * */
export interface WalkthroughCallback {
  /** The time at which the callback fired. */
  time: Date;
}

/**
 * A press handler for the mask or the backdrop.
 *
 * Receives the walkthrough {@link WalkthroughContextType} so it can drive the
 * walkthrough (e.g. `(ctx) => ctx.next()`). See
 * {@link WalkthroughStep.onPressMask} and {@link WalkthroughStep.onPressBackdrop}.
 * */
export type OnPressWithContextType = (context?: WalkthroughContextType) => void;

/**
 * The reanimated layout animation props used by the walkthrough displayer:
 * `entering`, `exiting` and `layout`.
 *
 * These come from react-native-reanimated's `AnimatedProps<ViewProps>`.
 * */
export type ComponentLayoutProps = Pick<
  AnimatedProps<ViewProps>,
  "entering" | "exiting" | "layout"
>;

/** Easing curve applied to the mask transition between steps. */
export type WalkthroughEasing = EasingFunction | EasingFunctionFactory;

/**
 * Position of a mask in screen coordinates.
 *
 * Same as {@link WalkthroughStepMask} but without
 * {@link WalkthroughStepMask.allowInteraction}, as produced by the hook when it
 * measures the target.
 * */
export type WalkthroughMaskCoordinates = Omit<
  WalkthroughStepMask,
  "allowInteraction"
>;

/**
 * The animations used for the backdrop and the mask between steps.
 *
 * `entering`/`exiting` are the same props as {@link ComponentLayoutProps}
 * entering/exiting; `easing` drives the mask morph between steps.
 * */
export interface WalkthroughBackdropAnimations {
  /** Enter/exits for the backdrop pressables */
  entering: ComponentLayoutProps["entering"];
  /** Exits for the backdrop pressables */
  exiting: ComponentLayoutProps["exiting"];
  /** Easing curve for the mask transition between steps */
  easing: WalkthroughEasing;
}

/**
 * The full animation configuration for the walkthrough, with a section for the
 * backdrop/mask and a section for the step content container.
 * */
export interface WalkthroughLayoutAnimations {
  /** Animations for the backdrop/pressable */
  backdrop: WalkthroughBackdropAnimations;
  /** Layout animations for the step content container */
  content: ComponentLayoutProps;
}

/**
 * The `animations` prop accepts partial overrides of any subset.
 *
 * Mirrors {@link WalkthroughLayoutAnimations}, but every section and every
 * property is optional so callers can override just the pieces they care
 * about. See {@link WalkthroughOptions.animations}.
 * */
export type PartialWalkthroughLayoutAnimations = {
  /** Same as {@link WalkthroughLayoutAnimations.backdrop}, but partial. */
  backdrop?: Partial<WalkthroughBackdropAnimations>;
  /** Same as {@link WalkthroughLayoutAnimations.content}, but partial. */
  content?: Partial<ComponentLayoutProps>;
};

/**
 * Props for the backdrop mask, i.e. everything the displayer needs to render
 * the mask overlay for a step.
 *
 * It extends the mask-related bits of {@link WalkthroughStep} with the
 * (optional) backdrop animations, plus the shared {@link WalkthroughContextType}.
 * */
export interface WalkthroughMaskProps
  extends
    Pick<
      WalkthroughStep,
      "mask" | "onPressBackdrop" | "onPressMask" | "animationDuration"
    >,
    Partial<WalkthroughBackdropAnimations> {
  /** The shared walkthrough context. */
  context: WalkthroughContextType;
}

/**
 * A single step of the walkthrough.
 *
 * This is the full, resolved shape of a step as stored by the
 * {@link WalkthroughProvider}. Callers usually build one through
 * {@link useWalkthroughStep}, which measures the target and fills in
 * {@link mask} and {@link measureMask} automatically.
 * */
export interface WalkthroughStep<
  P extends ContentComponentProps = ContentComponentProps,
> {
  /**
   * The order of this step in the walkthrough. Must be unique among the
   * registered steps; the walkthrough advances by going up these numbers.
   * */
  number: number;
  /**
   * A stable unique id for this step. Used to dedupe registration and as the
   * React key for the content container in the displayer. Defaults to the
   * string of `number` when omitted.
   * */
  identifier: string;
  /**
   * Extra props passed to this step's {@link contentComponent} (or the
   * provider's fallback), on top of {@link ContentComponentProps.ctx} and
   * {@link ContentComponentProps.step}.
   * */
  contentComponentProps?: Omit<P, keyof ContentComponentProps>;
  /**
   * The component rendered as overlay content for this step. Falls back to the
   * provider-level {@link WalkthroughOptions.contentComponent} when omitted.
   * */
  contentComponent?: ComponentType<P>;
  /**
   * When `true`, the whole screen is treated as the mask: the backdrop covers
   * everything and the content renders on top.
   * */
  fullScreen?: boolean;
  /**
   * Adjusts the measured mask. Merged with {@link WalkthroughOptions.layoutAdjustments}
   * per key, with the step's values taking precedence.
   * */
  layoutAdjustments?: LayoutAdjustments;
  /**
   * Only allow the `onLayout` to get set once. This is useful on for example,
   * scrollable containers where the position on the page can change when you
   * scroll.
   * */
  layoutLock?: boolean;
  /**
   * Overrides the mask transition duration (in ms) for this step.
   *
   * The mask morphs between steps over the provider's `animationDuration`
   * (default 300ms). This lets a single step use a different duration. Falls
   * back to the provider's duration when omitted.
   * */
  animationDuration?: number;
  /** Called when this step becomes active. */
  onStart?: (props: WalkthroughCallback) => void;
  /** Called when the walkthrough moves past this step. */
  onFinish?: (props: WalkthroughCallback) => void;
  /** Called when the app goes to the background while this step is active. */
  onBackground?: () => void;
  /** Called when the user taps inside the mask. */
  onPressMask?: OnPressWithContextType;
  /** Called when the user taps the backdrop (outside the mask). */
  onPressBackdrop?: OnPressWithContextType;
  /**
   * The rectangle of the highlighted target. Normally measured automatically
   * by {@link useWalkthroughStep}.
   * */
  mask: WalkthroughStepMask;
  /**
   * The final mask used for rendering, after {@link layoutAdjustments} are
   * applied. Falls back to {@link mask} when not set.
   * */
  computedMask?: WalkthroughStepMask;
  /**
   * Re-measures the target and re-registers the step with fresh coordinates.
   * Provided automatically by {@link useWalkthroughStep}.
   * */
  measureMask: () => void;
}

/**
 * Same as {@link WalkthroughStep}, but with {@link WalkthroughStep.mask}
 * replaced by `maskAllowInteraction`.
 *
 * Because the hook measures the target itself, callers never provide a full
 * {@link WalkthroughStepMask}; instead they only opt into interaction through
 * `maskAllowInteraction`.
 * */
export type UseWalkthroughStepStrict<P extends ContentComponentProps> = Omit<
  WalkthroughStep<P>,
  "mask"
> & {
  /**
   * Whether touches inside the mask should pass through to the target view.
   * Equivalent to {@link WalkthroughStepMask.allowInteraction}
   *
   * Defaults to the provider's {@link WalkthroughOptions.maskAllowInteraction}
   * value, which defaults to `false` (the target is blocked while highlighted).
   */
  maskAllowInteraction?: boolean;
};

/**
 * The input of {@link useWalkthroughStep}.
 *
 * Like {@link UseWalkthroughStepStrict}, but {@link WalkthroughStep.identifier}
 * and {@link WalkthroughStep.measureMask} are optional: the identifier defaults
 * to the string of the step's number, and the hook provides its own measureMask.
 * */
export type UseWalkthroughStep<P extends ContentComponentProps> = Omit<
  UseWalkthroughStepStrict<P>,
  "identifier" | "measureMask"
> &
  Partial<Pick<UseWalkthroughStepStrict<P>, "identifier" | "measureMask">>;

/**
 * The props accepted by the {@link WalkthroughProvider}.
 *
 * Most settings are a partial pick of {@link WalkthroughContextType} (so the
 * provider and the context agree on their shape), plus the optional
 * {@link animations} overrides.
 * */
export interface WalkthroughOptions<
  P extends ContentComponentProps,
> extends Partial<
  Pick<
    WalkthroughContextType<P>,
    | "useIsFocused"
    | "contentComponent"
    | "animationDuration"
    | "backdropColor"
    | "layoutAdjustments"
    | "maskAllowInteraction"
    | "debug"
  >
> {
  /**
   * Overrides for the default animations.
   *
   * If omitted, the defaults are a fade for the backdrop and content (sized by
   * {@link animationDuration}) and an elastic easing for the mask morph.
   * */
  animations?: PartialWalkthroughLayoutAnimations;
}
