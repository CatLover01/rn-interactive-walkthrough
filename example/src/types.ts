import type { ComponentType } from "react";

export type DemoPreviewKind =
  | "tooltips"
  | "interactive"
  | "tap"
  | "fullscreen"
  | "variety"
  | "programmatic"
  | "themed"
  | "pulse";

export type DemoDescriptor = {
  id: string;
  title: string;
  description: string;
  preview: DemoPreviewKind;
  screenTitle: string;
  screen: ComponentType;
};
