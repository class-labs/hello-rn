import { config } from '@tamagui/config/v2-reanimated';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui(config);

// This makes typescript properly type everything based on the config
type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
