import { View } from "react-native";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { useSetTheme, useTheme } from "../support/ThemeProvider";

export function HomeScreen() {
  const theme = useTheme();
  const setTheme = useSetTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <Text>Home Screen</Text>
      <TextInput placeholder="Please enter your name" />
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Button
          onPress={() => {
            setTheme({ fontSize: theme.fontSize - 1 });
          }}
        >
          -
        </Button>
        <Button
          onPress={() => {
            setTheme({ fontSize: 16 });
          }}
        >
          Reset
        </Button>
        <Button
          onPress={() => {
            setTheme({ fontSize: theme.fontSize + 1 });
          }}
        >
          +
        </Button>
      </View>
    </View>
  );
}
