import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WalkthroughProvider } from "rn-interactive-walkthrough";

import { DemoShell } from "./components/DemoShell";
import { GalleryScreen } from "./screens/GalleryScreen";
import { colors } from "./theme";
import type { DemoDescriptor } from "./types";

export default function App() {
  const [demo, setDemo] = useState<DemoDescriptor | null>(null);

  const closeDemo = useCallback(() => {
    setDemo(null);
  }, []);

  return (
    <SafeAreaProvider>
      <WalkthroughProvider
        key={demo?.id}
        backdropColor={colors.backdrop}
        pulse={demo?.id === "pulse" ? { enabled: true } : undefined}
      >
        {demo ? (
          <DemoShell title={demo.screenTitle} onBack={closeDemo}>
            <demo.screen />
          </DemoShell>
        ) : (
          <GalleryScreen onOpen={setDemo} />
        )}
      </WalkthroughProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
