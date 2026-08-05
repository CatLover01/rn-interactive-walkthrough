# rn-interactive-walkthrough API

## Interfaces

<a id="api-ioverlaycomponentprops"></a>

### IOverlayComponentProps

#### Extends

- [`IWalkthroughContext`](#api-iwalkthroughcontext)

#### Properties

<a id="api-allsteps"></a>

##### allSteps

> **allSteps**: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`allSteps`](#api-allsteps-1)

<a id="api-animatenextlayoutchange"></a>

##### animateNextLayoutChange

> **animateNextLayoutChange**: (`duration?`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration?` | `number` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`animateNextLayoutChange`](#api-animatenextlayoutchange-1)

<a id="api-backdropcolor"></a>

##### backdropColor

> **backdropColor**: `string`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`backdropColor`](#api-backdropcolor-1)

<a id="api-currentstepnumber"></a>

##### currentStepNumber

> **currentStepNumber**: `number` \| `undefined`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`currentStepNumber`](#api-currentstepnumber-1)

<a id="api-currentsteps"></a>

##### currentSteps

> **currentSteps**: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`currentSteps`](#api-currentsteps-1)

<a id="api-debug"></a>

##### debug

> **debug**: `boolean`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`debug`](#api-debug-1)

<a id="api-goto"></a>

##### goTo

> **goTo**: (`number`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `number` | `number` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`goTo`](#api-goto-1)

<a id="api-isready"></a>

##### isReady

> **isReady**: `boolean`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`isReady`](#api-isready-1)

<a id="api-iswalkthroughon"></a>

##### isWalkthroughOn

> **isWalkthroughOn**: `boolean`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`isWalkthroughOn`](#api-iswalkthroughon-1)

<a id="api-next"></a>

##### next

> **next**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`next`](#api-next-1)

<a id="api-previous"></a>

##### previous

> **previous**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`previous`](#api-previous-1)

<a id="api-registerstep"></a>

##### registerStep

> **registerStep**: (`step`: [`IWalkthroughStep`](#api-iwalkthroughstep)) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `step` | [`IWalkthroughStep`](#api-iwalkthroughstep) |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`registerStep`](#api-registerstep-1)

<a id="api-setbackdropcolor"></a>

##### setBackdropColor

> **setBackdropColor**: (`color`: `string`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `color` | `string` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`setBackdropColor`](#api-setbackdropcolor-1)

<a id="api-settransitionduration"></a>

##### setTransitionDuration

> **setTransitionDuration**: (`duration`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration` | `number` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`setTransitionDuration`](#api-settransitionduration-1)

<a id="api-start"></a>

##### start

> **start**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`start`](#api-start-1)

<a id="api-step"></a>

##### step

> **step**: [`IWalkthroughStep`](#api-iwalkthroughstep)

<a id="api-stop"></a>

##### stop

> **stop**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`stop`](#api-stop-1)

<a id="api-transitionduration"></a>

##### transitionDuration

> **transitionDuration**: `number`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`transitionDuration`](#api-transitionduration-1)

<a id="api-updatestep"></a>

##### updateStep

> **updateStep**: (`identifier`: `string`, `step`: `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\>) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `identifier` | `string` |
| `step` | `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\> |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`updateStep`](#api-updatestep-1)

<a id="api-useisfocused"></a>

##### useIsFocused

> **useIsFocused**: () => `boolean`

###### Returns

`boolean`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`useIsFocused`](#api-useisfocused-1)

***

<a id="api-iwalkthroughcallback"></a>

### IWalkthroughCallback

#### Properties

<a id="api-time"></a>

##### time

> **time**: `Date`

***

<a id="api-iwalkthroughcontext"></a>

### IWalkthroughContext

#### Extends

- [`IWalkthroughFunctions`](#api-iwalkthroughfunctions)

#### Extended by

- [`IOverlayComponentProps`](#api-ioverlaycomponentprops)

#### Properties

<a id="api-allsteps-1"></a>

##### allSteps

> **allSteps**: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]

<a id="api-animatenextlayoutchange-1"></a>

##### animateNextLayoutChange

> **animateNextLayoutChange**: (`duration?`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration?` | `number` |

###### Returns

`void`

<a id="api-backdropcolor-1"></a>

##### backdropColor

> **backdropColor**: `string`

<a id="api-currentstepnumber-1"></a>

##### currentStepNumber

> **currentStepNumber**: `number` \| `undefined`

<a id="api-currentsteps-1"></a>

##### currentSteps

> **currentSteps**: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]

<a id="api-debug-1"></a>

##### debug

> **debug**: `boolean`

<a id="api-goto-1"></a>

##### goTo

> **goTo**: (`number`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `number` | `number` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`goTo`](#api-goto-2)

<a id="api-isready-1"></a>

##### isReady

> **isReady**: `boolean`

<a id="api-iswalkthroughon-1"></a>

##### isWalkthroughOn

> **isWalkthroughOn**: `boolean`

<a id="api-next-1"></a>

##### next

> **next**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`next`](#api-next-2)

<a id="api-previous-1"></a>

##### previous

> **previous**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`previous`](#api-previous-2)

<a id="api-registerstep-1"></a>

##### registerStep

> **registerStep**: (`step`: [`IWalkthroughStep`](#api-iwalkthroughstep)) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `step` | [`IWalkthroughStep`](#api-iwalkthroughstep) |

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`registerStep`](#api-registerstep-2)

<a id="api-setbackdropcolor-1"></a>

##### setBackdropColor

> **setBackdropColor**: (`color`: `string`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `color` | `string` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`setBackdropColor`](#api-setbackdropcolor-2)

<a id="api-settransitionduration-1"></a>

##### setTransitionDuration

> **setTransitionDuration**: (`duration`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration` | `number` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`setTransitionDuration`](#api-settransitionduration-2)

<a id="api-start-1"></a>

##### start

> **start**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`start`](#api-start-2)

<a id="api-stop-1"></a>

##### stop

> **stop**: () => `void`

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`stop`](#api-stop-2)

<a id="api-transitionduration-1"></a>

##### transitionDuration

> **transitionDuration**: `number`

<a id="api-updatestep-1"></a>

##### updateStep

> **updateStep**: (`identifier`: `string`, `step`: `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\>) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `identifier` | `string` |
| `step` | `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\> |

###### Returns

`void`

###### Inherited from

[`IWalkthroughFunctions`](#api-iwalkthroughfunctions).[`updateStep`](#api-updatestep-2)

<a id="api-useisfocused-1"></a>

##### useIsFocused

> **useIsFocused**: () => `boolean`

###### Returns

`boolean`

***

<a id="api-iwalkthroughfunctions"></a>

### IWalkthroughFunctions

#### Extended by

- [`IWalkthroughContext`](#api-iwalkthroughcontext)

#### Properties

<a id="api-goto-2"></a>

##### goTo

> **goTo**: (`number`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `number` | `number` |

###### Returns

`void`

<a id="api-next-2"></a>

##### next

> **next**: () => `void`

###### Returns

`void`

<a id="api-previous-2"></a>

##### previous

> **previous**: () => `void`

###### Returns

`void`

<a id="api-registerstep-2"></a>

##### registerStep

> **registerStep**: (`step`: [`IWalkthroughStep`](#api-iwalkthroughstep)) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `step` | [`IWalkthroughStep`](#api-iwalkthroughstep) |

###### Returns

`void`

<a id="api-setbackdropcolor-2"></a>

##### setBackdropColor

> **setBackdropColor**: (`color`: `string`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `color` | `string` |

###### Returns

`void`

<a id="api-settransitionduration-2"></a>

##### setTransitionDuration

> **setTransitionDuration**: (`duration`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration` | `number` |

###### Returns

`void`

<a id="api-start-2"></a>

##### start

> **start**: () => `void`

###### Returns

`void`

<a id="api-stop-2"></a>

##### stop

> **stop**: () => `void`

###### Returns

`void`

<a id="api-updatestep-2"></a>

##### updateStep

> **updateStep**: (`identifier`: `string`, `step`: `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\>) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `identifier` | `string` |
| `step` | `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\> |

###### Returns

`void`

***

<a id="api-iwalkthroughprovider"></a>

### IWalkthroughProvider

#### Extends

- `Partial`\<`Pick`\<[`IWalkthroughContext`](#api-iwalkthroughcontext), `"useIsFocused"` \| `"transitionDuration"` \| `"backdropColor"` \| `"animateNextLayoutChange"` \| `"debug"`\>\>

#### Properties

<a id="api-animatenextlayoutchange-2"></a>

##### animateNextLayoutChange?

> `optional` **animateNextLayoutChange?**: (`duration?`: `number`) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `duration?` | `number` |

###### Returns

`void`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`animateNextLayoutChange`](#api-animatenextlayoutchange-1)

<a id="api-backdropcolor-2"></a>

##### backdropColor?

> `optional` **backdropColor?**: `string`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`backdropColor`](#api-backdropcolor-1)

<a id="api-children"></a>

##### children?

> `optional` **children?**: `ReactNode`

<a id="api-debug-2"></a>

##### debug?

> `optional` **debug?**: `boolean`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`debug`](#api-debug-1)

<a id="api-enableexperimentallayoutanimation"></a>

##### enableExperimentalLayoutAnimation?

> `optional` **enableExperimentalLayoutAnimation?**: `boolean`

<a id="api-transitionduration-2"></a>

##### transitionDuration?

> `optional` **transitionDuration?**: `number`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`transitionDuration`](#api-transitionduration-1)

<a id="api-useisfocused-2"></a>

##### useIsFocused?

> `optional` **useIsFocused?**: () => `boolean`

###### Returns

`boolean`

###### Inherited from

[`IWalkthroughContext`](#api-iwalkthroughcontext).[`useIsFocused`](#api-useisfocused-1)

***

<a id="api-iwalkthroughstep"></a>

### IWalkthroughStep

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* [`IOverlayComponentProps`](#api-ioverlaycomponentprops) | [`IOverlayComponentProps`](#api-ioverlaycomponentprops) |

#### Properties

<a id="api-computedmask"></a>

##### computedMask?

> `optional` **computedMask?**: [`IWalkthroughStepMask`](#api-iwalkthroughstepmask-1)

<a id="api-enablehardwareback"></a>

##### enableHardwareBack?

> `optional` **enableHardwareBack?**: `boolean` \| `EnableHardwareBackFunction`

<a id="api-fullscreen"></a>

##### fullScreen?

> `optional` **fullScreen?**: `boolean`

<a id="api-identifier"></a>

##### identifier

> **identifier**: `string`

<a id="api-layoutadjustments"></a>

##### layoutAdjustments?

> `optional` **layoutAdjustments?**: `ILayoutAdjustments`

<a id="api-layoutlock"></a>

##### layoutLock?

> `optional` **layoutLock?**: `boolean`

<a id="api-mask"></a>

##### mask

> **mask**: [`IWalkthroughStepMask`](#api-iwalkthroughstepmask-1)

<a id="api-measuremask"></a>

##### measureMask

> **measureMask**: () => `void`

###### Returns

`void`

<a id="api-number"></a>

##### number

> **number**: `number`

<a id="api-onbackground"></a>

##### onBackground?

> `optional` **onBackground?**: () => `void`

###### Returns

`void`

<a id="api-onfinish"></a>

##### onFinish?

> `optional` **onFinish?**: (`props`: [`IWalkthroughCallback`](#api-iwalkthroughcallback)) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`IWalkthroughCallback`](#api-iwalkthroughcallback) |

###### Returns

`void`

<a id="api-onpressbackdrop"></a>

##### onPressBackdrop?

> `optional` **onPressBackdrop?**: `OnPressWithContextType`

<a id="api-onpressmask"></a>

##### onPressMask?

> `optional` **onPressMask?**: `OnPressWithContextType`

<a id="api-onstart"></a>

##### onStart?

> `optional` **onStart?**: (`props`: [`IWalkthroughCallback`](#api-iwalkthroughcallback)) => `void`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`IWalkthroughCallback`](#api-iwalkthroughcallback) |

###### Returns

`void`

<a id="api-overlaycomponent"></a>

##### OverlayComponent?

> `optional` **OverlayComponent?**: `ComponentType`\<`P`\>

<a id="api-overlaycomponentkey"></a>

##### overlayComponentKey

> **overlayComponentKey**: `string`

<a id="api-overlaycomponentprops"></a>

##### overlayComponentProps?

> `optional` **overlayComponentProps?**: `Omit`\<`P`, keyof [`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>

***

<a id="api-iwalkthroughstepmask-1"></a>

### IWalkthroughStepMask

#### Properties

<a id="api-allowinteraction"></a>

##### allowInteraction?

> `optional` **allowInteraction?**: `boolean`

<a id="api-height"></a>

##### height

> **height**: `number`

<a id="api-width"></a>

##### width

> **width**: `number`

<a id="api-x"></a>

##### x

> **x**: `number`

<a id="api-y"></a>

##### y

> **y**: `number`

## Type Aliases

<a id="api-iusewalkthroughstep"></a>

### IUseWalkthroughStep

> **IUseWalkthroughStep**\<`P`\> = `PartialBy`\<`IUseWalkthroughStepStrict`\<`P`\>, `"identifier"` \| `"overlayComponentKey"` \| `"measureMask"`\>

#### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* [`IOverlayComponentProps`](#api-ioverlaycomponentprops) |

## Variables

<a id="api-walkthroughprovider"></a>

### WalkthroughProvider

> `const` **WalkthroughProvider**: `ForwardRefExoticComponent`\<[`IWalkthroughProvider`](#api-iwalkthroughprovider) & `RefAttributes`\<[`IWalkthroughFunctions`](#api-iwalkthroughfunctions)\>\>

## Functions

<a id="api-enableexperimentallayoutanimation-1"></a>

### enableExperimentalLayoutAnimation()

> **enableExperimentalLayoutAnimation**(): `void`

#### Returns

`void`

***

<a id="api-usewalkthrough"></a>

### useWalkthrough()

> **useWalkthrough**(): [`IWalkthroughContext`](#api-iwalkthroughcontext)

#### Returns

[`IWalkthroughContext`](#api-iwalkthroughcontext)

***

<a id="api-usewalkthroughstep"></a>

### useWalkthroughStep()

> **useWalkthroughStep**\<`P`\>(`__namedParameters`: [`IUseWalkthroughStep`](#api-iusewalkthroughstep)\<`P`\>): \{ `allSteps`: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]; `animateNextLayoutChange`: (`duration?`: `number`) => `void`; `backdropColor`: `string`; `currentStepNumber`: `number` \| `undefined`; `currentSteps`: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]; `debug`: `boolean`; `goTo`: (`number`: `number`) => `void`; `isReady`: `boolean`; `isVisible`: `boolean`; `isWalkthroughOn`: `boolean`; `next`: () => `void`; `onLayout`: (`event`: `LayoutChangeEvent`) => `void`; `onMeasure`: (`_x`: `number`, `_y`: `number`, `width`: `number`, `height`: `number`, `x`: `number`, `y`: `number`) => `void`; `previous`: () => `void`; `registerStep`: (`step`: [`IWalkthroughStep`](#api-iwalkthroughstep)) => `void`; `setBackdropColor`: (`color`: `string`) => `void`; `setTransitionDuration`: (`duration`: `number`) => `void`; `start`: () => `void`; `step`: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\> \| `undefined`; `stop`: () => `void`; `transitionDuration`: `number`; `updateStep`: (`identifier`: `string`, `step`: `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\>) => `void`; `useIsFocused`: () => `boolean`; \}

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* [`IOverlayComponentProps`](#api-ioverlaycomponentprops) | [`IOverlayComponentProps`](#api-ioverlaycomponentprops) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`IUseWalkthroughStep`](#api-iusewalkthroughstep)\<`P`\> |

#### Returns

\{ `allSteps`: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]; `animateNextLayoutChange`: (`duration?`: `number`) => `void`; `backdropColor`: `string`; `currentStepNumber`: `number` \| `undefined`; `currentSteps`: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[]; `debug`: `boolean`; `goTo`: (`number`: `number`) => `void`; `isReady`: `boolean`; `isVisible`: `boolean`; `isWalkthroughOn`: `boolean`; `next`: () => `void`; `onLayout`: (`event`: `LayoutChangeEvent`) => `void`; `onMeasure`: (`_x`: `number`, `_y`: `number`, `width`: `number`, `height`: `number`, `x`: `number`, `y`: `number`) => `void`; `previous`: () => `void`; `registerStep`: (`step`: [`IWalkthroughStep`](#api-iwalkthroughstep)) => `void`; `setBackdropColor`: (`color`: `string`) => `void`; `setTransitionDuration`: (`duration`: `number`) => `void`; `start`: () => `void`; `step`: [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\> \| `undefined`; `stop`: () => `void`; `transitionDuration`: `number`; `updateStep`: (`identifier`: `string`, `step`: `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\>) => `void`; `useIsFocused`: () => `boolean`; \}

| Name | Type |
| ------ | ------ |
| `allSteps` | [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[] |
| `animateNextLayoutChange()` | (`duration?`: `number`) => `void` |
| `backdropColor` | `string` |
| `currentStepNumber` | `number` \| `undefined` |
| `currentSteps` | [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\>[] |
| `debug` | `boolean` |
| `goTo()` | (`number`: `number`) => `void` |
| `isReady` | `boolean` |
| `isVisible` | `boolean` |
| `isWalkthroughOn` | `boolean` |
| `next()` | () => `void` |
| `onLayout()` | (`event`: `LayoutChangeEvent`) => `void` |
| `onMeasure()` | (`_x`: `number`, `_y`: `number`, `width`: `number`, `height`: `number`, `x`: `number`, `y`: `number`) => `void` |
| `previous()` | () => `void` |
| `registerStep()` | (`step`: [`IWalkthroughStep`](#api-iwalkthroughstep)) => `void` |
| `setBackdropColor()` | (`color`: `string`) => `void` |
| `setTransitionDuration()` | (`duration`: `number`) => `void` |
| `start()` | () => `void` |
| `step` | [`IWalkthroughStep`](#api-iwalkthroughstep)\<[`IOverlayComponentProps`](#api-ioverlaycomponentprops)\> \| `undefined` |
| `stop()` | () => `void` |
| `transitionDuration` | `number` |
| `updateStep()` | (`identifier`: `string`, `step`: `Partial`\<[`IWalkthroughStep`](#api-iwalkthroughstep)\>) => `void` |
| `useIsFocused()` | () => `boolean` |
