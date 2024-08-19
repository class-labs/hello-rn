import type { ReactNode } from "react";

import { FontProvider } from "./FontProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: ReactNode;
};

export function AppProvider(props: Props) {
  const { children } = props;
  return (
    <FontProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </FontProvider>
  );
}
