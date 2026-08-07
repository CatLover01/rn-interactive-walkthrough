import { FullScreenDemoScreen } from "./demos/FullScreenDemo";
import { InteractiveTargetsScreen } from "./demos/InteractiveTargetsDemo";
import { OverlayVarietyScreen } from "./demos/OverlayVarietyDemo";
import { ProgrammaticScreen } from "./demos/ProgrammaticDemo";
import { SmartTooltipsScreen } from "./demos/SmartTooltipsDemo";
import { TapToAdvanceScreen } from "./demos/TapToAdvanceDemo";
import { ThemedScreen } from "./demos/ThemedDemo";
import type { DemoDescriptor } from "./types";

export const demos: DemoDescriptor[] = [
  {
    id: "smart-tooltips",
    title: "Smart tooltips",
    description:
      "Tooltips measure their target and land below or above automatically.",
    preview: "tooltips",
    screenTitle: "Smart tooltips",
    screen: SmartTooltipsScreen,
  },
  {
    id: "interactive-targets",
    title: "Interactive targets",
    description: "Keep controls usable while they are highlighted.",
    preview: "interactive",
    screenTitle: "Interactive targets",
    screen: InteractiveTargetsScreen,
  },
  {
    id: "tap-to-advance",
    title: "Tap to advance",
    description: "Use the target and the backdrop as the tour buttons.",
    preview: "tap",
    screenTitle: "Tap to advance",
    screen: TapToAdvanceScreen,
  },
  {
    id: "full-screen",
    title: "Full-screen overlays",
    description: "Welcome screens and finales that cover the whole app.",
    preview: "fullscreen",
    screenTitle: "Full-screen overlays",
    screen: FullScreenDemoScreen,
  },
  {
    id: "overlay-variety",
    title: "Overlay styles",
    description:
      "Callouts, bottom sheets, centered cards, and tooltips in one tour.",
    preview: "variety",
    screenTitle: "Overlay styles",
    screen: OverlayVarietyScreen,
  },
  {
    id: "programmatic",
    title: "Programmatic control",
    description: "Jump between steps and tweak the look from anywhere.",
    preview: "programmatic",
    screenTitle: "Programmatic control",
    screen: ProgrammaticScreen,
  },
  {
    id: "themed",
    title: "Themed tour",
    description: "Overlays that match the style of your own app.",
    preview: "themed",
    screenTitle: "Themed tour",
    screen: ThemedScreen,
  },
];
