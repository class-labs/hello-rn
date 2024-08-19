import type { ReactNode } from "react";

import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: ReactNode;
};

export function AppProvider(props: Props) {
  const { children } = props;
  return <ThemeProvider>{children}</ThemeProvider>;
}
