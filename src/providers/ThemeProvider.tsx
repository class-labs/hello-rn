import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  DarkTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../config/tamagui.config';

export function ThemeProvider(props: { children: ReactNode }) {
  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <NavigationThemeProvider value={DarkTheme}>
          <View
            style={{
              flex: 1,
              // TODO: Use a constant here or get it from our theme config
              backgroundColor: '#0E1116',
            }}
          >
            {props.children}
          </View>
        </NavigationThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
