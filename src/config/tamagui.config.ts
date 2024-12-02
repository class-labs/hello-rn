import { config } from '@tamagui/config/v2-reanimated';
import { createTamagui } from 'tamagui';

const { themes } = config;

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...themes,
    dark: {
      ...themes.dark,
      pageBackground: '#0E1116',
    },
    light: {
      ...themes.light,
      pageBackground: 'white',
    },
  },
});

// This makes typescript properly type everything based on the config
type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
