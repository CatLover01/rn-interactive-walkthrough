# rn-interactive-walkthrough API

## Interfaces

<a id="api-contentcomponentprops"></a>

### ContentComponentProps

The props injected into every content component (like the example `Tooltip`).

A content component is a React component that receives [ctx](#api-ctx) and
[step](#api-step), plus any `contentComponentProps` the step configured. It is
rendered above the mask by the [WalkthroughProvider](#api-walkthroughprovider).

#### Properties

<a id="api-ctx"></a>

##### ctx

> **ctx**: [`WalkthroughContextType`](#api-walkthroughcontexttype)

The walkthrough context.

<a id="api-step"></a>

##### step

> **step**: [`WalkthroughStep`](#api-walkthroughstep)

The step currently being displayed.

***

<a id="api-layoutadjustments"></a>

### LayoutAdjustments

Adjustments applied on top of a measured [WalkthroughStepMask](#api-walkthroughstepmask-1) to tweak
where the mask ends up, e.g. to add padding around the target or to clamp it
to the screen. See [useWalkthroughStep](#api-usewalkthroughstep-1).

#### Properties

<a id="api-addheight"></a>

##### addHeight?

> `optional` **addHeight?**: `number`

Adds to (or subtracts from) the mask's height.

<a id="api-addpadding"></a>

##### addPadding?

> `optional` **addPadding?**: `number`

Shorthand for adding padding on all sides of the mask.

<a id="api-addwidth"></a>

##### addWidth?

> `optional` **addWidth?**: `number`

Adds to (or subtracts from) the mask's width.

<a id="api-addx"></a>

##### addX?

> `optional` **addX?**: `number`

Adds to (or subtracts from) the mask's x.

<a id="api-addy"></a>

##### addY?

> `optional` **addY?**: `number`

Adds to (or subtracts from) the mask's y.

<a id="api-height"></a>

##### height?

> `optional` **height?**: `number`

Overrides the mask's height entirely.

<a id="api-maxx"></a>

##### maxX?

> `optional` **maxX?**: `number`

The maximum x the computed mask may have.

<a id="api-maxy"></a>

##### maxY?

> `optional` **maxY?**: `number`

The maximum y the computed mask may have.

<a id="api-minx"></a>

##### minX?

> `optional` **minX?**: `number`

The minimum x the computed mask may have.

<a id="api-miny"></a>

##### minY?

> `optional` **minY?**: `number`

The minimum y the computed mask may have.

<a id="api-width"></a>

##### width?

> `optional` **width?**: `number`

Overrides the mask's width entirely.

<a id="api-x"></a>

##### x?

> `optional` **x?**: `number`

Overrides the mask's x entirely.

<a id="api-y"></a>

##### y?

> `optional` **y?**: `number`

Overrides the mask's y entirely.

***

<a id="api-walkthroughbackdropanimations"></a>

### WalkthroughBackdropAnimations

The animations used for the backdrop and the mask between steps.

`entering`/`exiting` are the same props as [ComponentLayoutProps](#api-componentlayoutprops)
entering/exiting; `easing` drives the mask morph between steps.

#### Properties

<a id="api-easing"></a>

##### easing

> **easing**: [`WalkthroughEasing`](#api-walkthrougheasing)

Easing curve for the mask transition between steps

<a id="api-entering"></a>

##### entering

> **entering**: `EntryOrExitLayoutType` \| `undefined`

Enter/exits for the backdrop pressables

<a id="api-exiting"></a>

##### exiting

> **exiting**: `EntryOrExitLayoutType` \| `undefined`

Exits for the backdrop pressables

***

<a id="api-walkthroughcallback"></a>

### WalkthroughCallback

The payload of the step lifecycle callbacks, [WalkthroughStep.onStart](#api-onstart)
and [WalkthroughStep.onFinish](#api-onfinish).

#### Properties

<a id="api-time"></a>

##### time

> **time**: `Date`

The time at which the callback fired.

***

<a id="api-walkthroughcontexttype"></a>

### WalkthroughContextType

The context made available to every consumer through [useWalkthrough](#api-usewalkthrough),
and passed to every content component as [ContentComponentProps.ctx](#api-ctx).

It exposes the current state of the walkthrough (current step, progress) and
the actions to drive it (start, stop, next, previous...).

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) | [`ContentComponentProps`](#api-contentcomponentprops) |

#### Properties

<a id="api-animationduration"></a>

##### animationDuration

> **animationDuration**: `number`

The base duration (in ms) used by the default [animations](#api-animations). Defaults to `300`.

<a id="api-animations"></a>

##### animations

> **animations**: [`WalkthroughLayoutAnimations`](#api-walkthroughlayoutanimations)

The merged animation configuration used by the displayer.

<a id="api-backdropcolor"></a>

##### backdropColor

> **backdropColor**: `string`

The color of the backdrop behind the mask, from [WalkthroughOptions.backdropColor](#api-backdropcolor-1). Defaults to `"#000000DA"`.

<a id="api-contentcomponent"></a>

##### contentComponent?

> `optional` **contentComponent?**: `ComponentType`\<`P`\>

The fallback content component used by steps that don't specify their own
[WalkthroughStep.contentComponent](#api-contentcomponent-2). See [WalkthroughOptions.contentComponent](#api-contentcomponent-1).

<a id="api-currentstep"></a>

##### currentStep

> **currentStep**: [`WalkthroughStep`](#api-walkthroughstep)\<[`ContentComponentProps`](#api-contentcomponentprops)\> \| `undefined`

The step currently being displayed, or `undefined` when inactive.

<a id="api-currentstepnumber"></a>

##### currentStepNumber

> **currentStepNumber**: `number` \| `undefined`

The number of the current step, or `undefined` when inactive.

<a id="api-debug"></a>

##### debug

> **debug**: `boolean`

Whether debug logging is enabled, from [WalkthroughOptions.debug](#api-debug-1). Defaults to `false`.

<a id="api-goto"></a>

##### goTo

> **goTo**: (`number`: `number`) => `void`

Jumps directly to the step with the given number.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `number` | `number` |

###### Returns

`void`

<a id="api-isactive"></a>

##### isActive

> **isActive**: `boolean`

Whether the walkthrough is currently running (a step is active).

<a id="api-isfirststep"></a>

##### isFirstStep

> **isFirstStep**: `boolean`

Whether the current step is the first one (`number === 1`).

<a id="api-islaststep"></a>

##### isLastStep

> **isLastStep**: `boolean`

Whether the current step is the last registered one.

<a id="api-isready"></a>

##### isReady

> **isReady**: `boolean`

Whether a step with `number === 1` is registered, so `start()` can run.

<a id="api-next"></a>

##### next

> **next**: () => `void`

Advances to the next step (or stays put on the last one).

###### Returns

`void`

<a id="api-previous"></a>

##### previous

> **previous**: () => `void`

Goes back to the previous step.

###### Returns

`void`

<a id="api-registerstep"></a>

##### registerStep

> **registerStep**: (`step`: [`WalkthroughStep`](#api-walkthroughstep)) => `void`

Registers a step, replacing any previously registered step with the same
[WalkthroughStep.identifier](#api-identifier). This is the upsert used by
[useWalkthroughStep](#api-usewalkthroughstep-1).

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `step` | [`WalkthroughStep`](#api-walkthroughstep) |

###### Returns

`void`

<a id="api-start"></a>

##### start

> **start**: () => `void`

Starts the walkthrough from the first registered step.

###### Returns

`void`

<a id="api-steps"></a>

##### steps

> **steps**: [`WalkthroughStep`](#api-walkthroughstep)\<[`ContentComponentProps`](#api-contentcomponentprops)\>[]

All registered steps, sorted by [WalkthroughStep.number](#api-number).

<a id="api-stop"></a>

##### stop

> **stop**: () => `void`

Stops the walkthrough and hides the overlay.

###### Returns

`void`

<a id="api-updatestep"></a>

##### updateStep

> **updateStep**: (`identifier`: `string`, `step`: `Partial`\<`P`\>) => `void`

Merges the given partial props into the step identified by
[WalkthroughStep.identifier](#api-identifier), if it is registered. Does nothing if no
step matches.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `identifier` | `string` |
| `step` | `Partial`\<`P`\> |

###### Returns

`void`

<a id="api-useisfocused"></a>

##### useIsFocused

> **useIsFocused**: () => `boolean`

A hook used to determine whether the current screen is focused. Can be
overridden through [WalkthroughOptions.useIsFocused](#api-useisfocused-1). Defaults to a
hook that always returns `true`.

###### Returns

`boolean`

***

<a id="api-walkthroughlayoutanimations"></a>

### WalkthroughLayoutAnimations

The full animation configuration for the walkthrough, with a section for the
backdrop/mask and a section for the step content container.

#### Properties

<a id="api-backdrop"></a>

##### backdrop

> **backdrop**: [`WalkthroughBackdropAnimations`](#api-walkthroughbackdropanimations)

Animations for the backdrop/pressable

<a id="api-content"></a>

##### content

> **content**: [`ComponentLayoutProps`](#api-componentlayoutprops)

Layout animations for the step content container

***

<a id="api-walkthroughoptions"></a>

### WalkthroughOptions

The props accepted by the [WalkthroughProvider](#api-walkthroughprovider).

Most settings are a partial pick of [WalkthroughContextType](#api-walkthroughcontexttype) (so the
provider and the context agree on their shape), plus the optional
[animations](#api-animations-1) overrides.

#### Extends

- `Partial`\<`Pick`\<[`WalkthroughContextType`](#api-walkthroughcontexttype)\<`P`\>, `"useIsFocused"` \| `"contentComponent"` \| `"animationDuration"` \| `"backdropColor"` \| `"debug"`\>\>

#### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) |

#### Properties

<a id="api-animationduration-1"></a>

##### animationDuration?

> `optional` **animationDuration?**: `number`

The base duration (in ms) used by the default [animations](#api-animations). Defaults to `300`.

###### Inherited from

`Partial.animationDuration`

<a id="api-animations-1"></a>

##### animations?

> `optional` **animations?**: [`PartialWalkthroughLayoutAnimations`](#api-partialwalkthroughlayoutanimations)

Overrides for the default animations.

If omitted, the defaults are a fade for the backdrop and content (sized by
[animationDuration](#api-animationduration-1)) and an elastic easing for the mask morph.

<a id="api-backdropcolor-1"></a>

##### backdropColor?

> `optional` **backdropColor?**: `string`

The color of the backdrop behind the mask, from [WalkthroughOptions.backdropColor](#api-backdropcolor-1). Defaults to `"#000000DA"`.

###### Inherited from

`Partial.backdropColor`

<a id="api-contentcomponent-1"></a>

##### contentComponent?

> `optional` **contentComponent?**: `ComponentType`\<`P`\>

The fallback content component used by steps that don't specify their own
[WalkthroughStep.contentComponent](#api-contentcomponent-2). See [WalkthroughOptions.contentComponent](#api-contentcomponent-1).

###### Inherited from

`Partial.contentComponent`

<a id="api-debug-1"></a>

##### debug?

> `optional` **debug?**: `boolean`

Whether debug logging is enabled, from [WalkthroughOptions.debug](#api-debug-1). Defaults to `false`.

###### Inherited from

`Partial.debug`

<a id="api-useisfocused-1"></a>

##### useIsFocused?

> `optional` **useIsFocused?**: () => `boolean`

A hook used to determine whether the current screen is focused. Can be
overridden through [WalkthroughOptions.useIsFocused](#api-useisfocused-1). Defaults to a
hook that always returns `true`.

###### Returns

`boolean`

###### Inherited from

`Partial.useIsFocused`

***

<a id="api-walkthroughstep"></a>

### WalkthroughStep

A single step of the walkthrough.

This is the full, resolved shape of a step as stored by the
[WalkthroughProvider](#api-walkthroughprovider). Callers usually build one through
[useWalkthroughStep](#api-usewalkthroughstep-1), which measures the target and fills in
[mask](#api-mask) and [measureMask](#api-measuremask) automatically.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) | [`ContentComponentProps`](#api-contentcomponentprops) |

#### Properties

<a id="api-computedmask"></a>

##### computedMask?

> `optional` **computedMask?**: [`WalkthroughStepMask`](#api-walkthroughstepmask-1)

The final mask used for rendering, after [layoutAdjustments](#api-layoutadjustments-1) are
applied. Falls back to [mask](#api-mask) when not set.

<a id="api-contentcomponent-2"></a>

##### contentComponent?

> `optional` **contentComponent?**: `ComponentType`\<`P`\>

The component rendered as overlay content for this step. Falls back to the
provider-level [WalkthroughOptions.contentComponent](#api-contentcomponent-1) when omitted.

<a id="api-contentcomponentprops-1"></a>

##### contentComponentProps?

> `optional` **contentComponentProps?**: `Omit`\<`P`, keyof [`ContentComponentProps`](#api-contentcomponentprops)\>

Extra props passed to this step's [contentComponent](#api-contentcomponent-2) (or the
provider's fallback), on top of [ContentComponentProps.ctx](#api-ctx) and
[ContentComponentProps.step](#api-step).

<a id="api-fullscreen"></a>

##### fullScreen?

> `optional` **fullScreen?**: `boolean`

When `true`, the whole screen is treated as the mask: the backdrop covers
everything and the content renders on top.

<a id="api-identifier"></a>

##### identifier

> **identifier**: `string`

A stable unique id for this step. Used to dedupe registration and as the
React key for the content container in the displayer. Defaults to the
string of `number` when omitted.

<a id="api-layoutadjustments-1"></a>

##### layoutAdjustments?

> `optional` **layoutAdjustments?**: [`LayoutAdjustments`](#api-layoutadjustments)

Adjusts the measured mask, e.g. to add padding.

<a id="api-layoutlock"></a>

##### layoutLock?

> `optional` **layoutLock?**: `boolean`

Only allow the `onLayout` to get set once. This is useful on for example,
scrollable containers where the position on the page can change when you
scroll.

<a id="api-mask"></a>

##### mask

> **mask**: [`WalkthroughStepMask`](#api-walkthroughstepmask-1)

The rectangle of the highlighted target. Normally measured automatically
by [useWalkthroughStep](#api-usewalkthroughstep-1).

<a id="api-measuremask"></a>

##### measureMask

> **measureMask**: () => `void`

Re-measures the target and re-registers the step with fresh coordinates.
Provided automatically by [useWalkthroughStep](#api-usewalkthroughstep-1).

###### Returns

`void`

<a id="api-number"></a>

##### number

> **number**: `number`

The order of this step in the walkthrough. Must be unique among the
registered steps; the walkthrough advances by going up these numbers.

<a id="api-onbackground"></a>

##### onBackground?

> `optional` **onBackground?**: () => `void`

Called when the app goes to the background while this step is active.

###### Returns

`void`

<a id="api-onfinish"></a>

##### onFinish?

> `optional` **onFinish?**: (`props`: [`WalkthroughCallback`](#api-walkthroughcallback)) => `void`

Called when the walkthrough moves past this step.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`WalkthroughCallback`](#api-walkthroughcallback) |

###### Returns

`void`

<a id="api-onpressbackdrop"></a>

##### onPressBackdrop?

> `optional` **onPressBackdrop?**: [`OnPressWithContextType`](#api-onpresswithcontexttype)

Called when the user taps the backdrop (outside the mask).

<a id="api-onpressmask"></a>

##### onPressMask?

> `optional` **onPressMask?**: [`OnPressWithContextType`](#api-onpresswithcontexttype)

Called when the user taps inside the mask.

<a id="api-onstart"></a>

##### onStart?

> `optional` **onStart?**: (`props`: [`WalkthroughCallback`](#api-walkthroughcallback)) => `void`

Called when this step becomes active.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`WalkthroughCallback`](#api-walkthroughcallback) |

###### Returns

`void`

***

<a id="api-walkthroughstepmask-1"></a>

### WalkthroughStepMask

The rectangle of the highlighted target, in screen coordinates.

A step uses this to tell the [WalkthroughProvider](#api-walkthroughprovider) where its target
view sits so the mask can be drawn around it. It is normally produced by the
hook by measuring the view, but can be supplied by hand, see
[WalkthroughStep.mask](#api-mask).

#### Properties

<a id="api-allowinteraction"></a>

##### allowInteraction?

> `optional` **allowInteraction?**: `boolean`

Whether touches inside the mask should pass through to the target view
instead of being swallowed by the walkthrough overlay.

<a id="api-height-1"></a>

##### height

> **height**: `number`

The height (in dp) of the target.

<a id="api-width-1"></a>

##### width

> **width**: `number`

The width (in dp) of the target.

<a id="api-x-1"></a>

##### x

> **x**: `number`

The x coordinate (in dp) of the target's top-left corner.

<a id="api-y-1"></a>

##### y

> **y**: `number`

The y coordinate (in dp) of the target's top-left corner.

## Type Aliases

<a id="api-componentlayoutprops"></a>

### ComponentLayoutProps

> **ComponentLayoutProps** = `Pick`\<`AnimatedProps`\<`ViewProps`\>, `"entering"` \| `"exiting"` \| `"layout"`\>

The reanimated layout animation props used by the walkthrough displayer:
`entering`, `exiting` and `layout`.

These come from react-native-reanimated's `AnimatedProps<ViewProps>`.

***

<a id="api-onpresswithcontexttype"></a>

### OnPressWithContextType

> **OnPressWithContextType** = (`context?`: [`WalkthroughContextType`](#api-walkthroughcontexttype)) => `void`

A press handler for the mask or the backdrop.

Receives the walkthrough [WalkthroughContextType](#api-walkthroughcontexttype) so it can drive the
walkthrough (e.g. `(ctx) => ctx.next()`). See
[WalkthroughStep.onPressMask](#api-onpressmask) and [WalkthroughStep.onPressBackdrop](#api-onpressbackdrop).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context?` | [`WalkthroughContextType`](#api-walkthroughcontexttype) |

#### Returns

`void`

***

<a id="api-partialwalkthroughlayoutanimations"></a>

### PartialWalkthroughLayoutAnimations

> **PartialWalkthroughLayoutAnimations** = \{ `backdrop?`: `Partial`\<[`WalkthroughBackdropAnimations`](#api-walkthroughbackdropanimations)\>; `content?`: `Partial`\<[`ComponentLayoutProps`](#api-componentlayoutprops)\>; \}

The `animations` prop accepts partial overrides of any subset.

Mirrors [WalkthroughLayoutAnimations](#api-walkthroughlayoutanimations), but every section and every
property is optional so callers can override just the pieces they care
about. See [WalkthroughOptions.animations](#api-animations-1).

#### Properties

<a id="api-backdrop-1"></a>

##### backdrop?

> `optional` **backdrop?**: `Partial`\<[`WalkthroughBackdropAnimations`](#api-walkthroughbackdropanimations)\>

Same as [WalkthroughLayoutAnimations.backdrop](#api-backdrop), but partial.

<a id="api-content-1"></a>

##### content?

> `optional` **content?**: `Partial`\<[`ComponentLayoutProps`](#api-componentlayoutprops)\>

Same as [WalkthroughLayoutAnimations.content](#api-content), but partial.

***

<a id="api-usewalkthroughstep"></a>

### UseWalkthroughStep

> **UseWalkthroughStep**\<`P`\> = `Omit`\<[`UseWalkthroughStepStrict`](#api-usewalkthroughstepstrict)\<`P`\>, `"identifier"` \| `"measureMask"`\> & `Partial`\<`Pick`\<[`UseWalkthroughStepStrict`](#api-usewalkthroughstepstrict)\<`P`\>, `"identifier"` \| `"measureMask"`\>\>

The input of [useWalkthroughStep](#api-usewalkthroughstep-1).

Like [UseWalkthroughStepStrict](#api-usewalkthroughstepstrict), but [WalkthroughStep.identifier](#api-identifier)
and [WalkthroughStep.measureMask](#api-measuremask) are optional: the identifier defaults
to the string of the step's number, and the hook provides its own measureMask.

#### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) |

***

<a id="api-usewalkthroughstepstrict"></a>

### UseWalkthroughStepStrict

> **UseWalkthroughStepStrict**\<`P`\> = `Omit`\<[`WalkthroughStep`](#api-walkthroughstep)\<`P`\>, `"mask"`\> & \{ `maskAllowInteraction?`: `boolean`; \}

Same as [WalkthroughStep](#api-walkthroughstep), but with [WalkthroughStep.mask](#api-mask)
replaced by `maskAllowInteraction`.

Because the hook measures the target itself, callers never provide a full
[WalkthroughStepMask](#api-walkthroughstepmask-1); instead they only opt into interaction through
`maskAllowInteraction`.

#### Type Declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `maskAllowInteraction?` | `boolean` | Whether touches inside the mask should pass through to the target view. Equivalent to [WalkthroughStepMask.allowInteraction](#api-allowinteraction). Defaults to `false` (the target is blocked while highlighted). |

#### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) |

***

<a id="api-walkthrougheasing"></a>

### WalkthroughEasing

> **WalkthroughEasing** = `EasingFunction` \| `EasingFunctionFactory`

Easing curve applied to the mask transition between steps.

***

<a id="api-walkthroughmaskcoordinates"></a>

### WalkthroughMaskCoordinates

> **WalkthroughMaskCoordinates** = `Omit`\<[`WalkthroughStepMask`](#api-walkthroughstepmask-1), `"allowInteraction"`\>

Position of a mask in screen coordinates.

Same as [WalkthroughStepMask](#api-walkthroughstepmask-1) but without
[WalkthroughStepMask.allowInteraction](#api-allowinteraction), as produced by the hook when it
measures the target.

## Functions

<a id="api-usewalkthrough"></a>

### useWalkthrough()

> **useWalkthrough**(): [`WalkthroughContextType`](#api-walkthroughcontexttype)\<[`ContentComponentProps`](#api-contentcomponentprops)\>

Returns the walkthrough context, see [WalkthroughContextType](#api-walkthroughcontexttype).

Must be called within a [WalkthroughProvider](#api-walkthroughprovider), otherwise it throws.
Use it to read the current step and to drive the walkthrough from your own
code (start, stop, next, previous, goTo).

#### Returns

[`WalkthroughContextType`](#api-walkthroughcontexttype)\<[`ContentComponentProps`](#api-contentcomponentprops)\>

***

<a id="api-usewalkthroughstep-1"></a>

### useWalkthroughStep()

> **useWalkthroughStep**\<`P`\>(`__namedParameters`: [`UseWalkthroughStep`](#api-usewalkthroughstep)\<`P`\>): \{ `isVisible`: `boolean`; `onLayout`: (`event`: `LayoutChangeEvent`) => `void`; `onMeasure`: (`_x`: `number`, `_y`: `number`, `width`: `number`, `height`: `number`, `x`: `number`, `y`: `number`) => `void`; `step`: [`WalkthroughStep`](#api-walkthroughstep)\<[`ContentComponentProps`](#api-contentcomponentprops)\> \| `undefined`; \}

Registers a walkthrough step and tracks the mask of the view it should
highlight.

Attach the returned `onLayout` to the target view: the hook measures it and
registers a step whose [WalkthroughStep.mask](#api-mask) matches the measured
rectangle (adjusted by [WalkthroughStep.layoutAdjustments](#api-layoutadjustments-1)). When the
step is active, its content component renders above the mask.

The step is re-registered (upserted by [WalkthroughStep.identifier](#api-identifier))
whenever its target moves, as long as [WalkthroughStep.layoutLock](#api-layoutlock) is
not set.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) | [`ContentComponentProps`](#api-contentcomponentprops) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`UseWalkthroughStep`](#api-usewalkthroughstep)\<`P`\> |

#### Returns

\{ `isVisible`: `boolean`; `onLayout`: (`event`: `LayoutChangeEvent`) => `void`; `onMeasure`: (`_x`: `number`, `_y`: `number`, `width`: `number`, `height`: `number`, `x`: `number`, `y`: `number`) => `void`; `step`: [`WalkthroughStep`](#api-walkthroughstep)\<[`ContentComponentProps`](#api-contentcomponentprops)\> \| `undefined`; \}

| Name | Type |
| ------ | ------ |
| `isVisible` | `boolean` |
| `onLayout()` | (`event`: `LayoutChangeEvent`) => `void` |
| `onMeasure()` | (`_x`: `number`, `_y`: `number`, `width`: `number`, `height`: `number`, `x`: `number`, `y`: `number`) => `void` |
| `step` | [`WalkthroughStep`](#api-walkthroughstep)\<[`ContentComponentProps`](#api-contentcomponentprops)\> \| `undefined` |

***

<a id="api-walkthroughprovider"></a>

### WalkthroughProvider()

> **WalkthroughProvider**\<`P`\>(`__namedParameters`: `PropsWithChildren`\<[`WalkthroughOptions`](#api-walkthroughoptions)\<`P`\>\>): `Element`

Wraps your app and provides the walkthrough to all consumers through
[useWalkthrough](#api-usewalkthrough).

Renders the overlay (backdrop, mask and step content) on top of its
children, and exposes the shared state (current step, progress) plus the
actions to drive the walkthrough. See [WalkthroughOptions](#api-walkthroughoptions) for the
accepted props.

#### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* [`ContentComponentProps`](#api-contentcomponentprops) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `PropsWithChildren`\<[`WalkthroughOptions`](#api-walkthroughoptions)\<`P`\>\> |

#### Returns

`Element`
