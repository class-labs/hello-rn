import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";

import config from "../config/tamagui.config";

export function ThemeProvider(props: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        {props.children}
      </Theme>
    </TamaguiProvider>
  );
}
