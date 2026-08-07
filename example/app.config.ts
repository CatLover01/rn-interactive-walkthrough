import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Interactive Walkthrough Example",
  slug: "rn-interactive-walkthrough-example",
  version: "1.0.0",
  orientation: "portrait",
  ios: {
    bundleIdentifier: "com.rninteractivewalkthrough.example",
  },
  android: {
    package: "com.rninteractivewalkthrough.example",
  },
});
