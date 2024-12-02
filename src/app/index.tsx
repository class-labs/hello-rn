import { Home } from '@tamagui/lucide-icons';

import { Button, Text, YStack } from '../components/core';

export default function App() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
      <Button icon={<Home />}>{t('Hello world!')}</Button>
      <Text>{t('Hello world!')}</Text>
    </YStack>
  );
}
