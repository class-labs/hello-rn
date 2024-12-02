import type { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { TamaguiProvider, Theme, YStack } from 'tamagui';

import config from '../config/tamagui.config';

export function ThemeProvider(props: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <NavigationThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <YStack flex={1} backgroundColor="$pageBackground">
            {props.children}
          </YStack>
        </NavigationThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
