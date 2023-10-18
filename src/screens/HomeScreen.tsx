import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { VStack } from "../components/VStack";

export function HomeScreen() {
  return (
    <VStack flex={1} backgroundColor="background" p="m">
      <Text variant="header" color="red">
        Home Screen
      </Text>
      <TextInput />
    </VStack>
  );
}
