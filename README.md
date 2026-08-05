# React Native Interactive Walkthrough

[![npm version](https://img.shields.io/npm/v/rn-interactive-walkthrough)](https://www.npmjs.com/package/rn-interactive-walkthrough)
[![MIT Licence](https://img.shields.io/github/license/catlover01/rn-interactive-walkthrough)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A cross-platform interactive walkthrough library for React Native that is performant, simple, extensible, and works with Expo.

Highlight a part of your screen, position a tooltip relative to it, and guide your users through your app without wrapper components or prop drilling.

## Demo

Here is a demo being used in production:

https://user-images.githubusercontent.com/525212/147407154-d7374b9a-c370-4e75-a269-ecd225b4bbbc.mp4

## Installation

```sh
npm install rn-interactive-walkthrough
```

## Usage

For usage see the [documentation](https://catlover01.github.io/rn-interactive-walkthrough/).


## Quick Start

```tsx
import * as React from "react";
import { WalkthroughProvider } from "rn-interactive-walkthrough";

export default function App() {
  return (
    <WalkthroughProvider>
      <MyAwesomeApp />
    </WalkthroughProvider>
  );
}
```

```tsx
import { useWalkthroughStep } from "rn-interactive-walkthrough";

function HomeScreen() {
  const { onLayout } = useWalkthroughStep({
    number: 1,
    OverlayComponent: NearbyUsersOverlay,
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 10 }} onLayout={onLayout}>
        <Text>Here is my app!</Text>
      </View>
    </View>
  );
}
```

## License

MIT
