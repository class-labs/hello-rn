import type { ReactNode } from 'react';

import { FontProvider } from '~/providers/FontProvider';
import { ThemeProvider } from '~/providers/ThemeProvider';

type Props = {
  onInitialized: () => void;
  children: ReactNode;
};

export function AppProvider(props: Props) {
  const { onInitialized, children } = props;
  return (
    <FontProvider onInitialized={onInitialized}>
      <ThemeProvider>{children}</ThemeProvider>
    </FontProvider>
  );
}
