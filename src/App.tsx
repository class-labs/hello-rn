import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "tamagui";

import { AppProvider } from "./providers/AppProvider";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

function ThemedNavigationContainer() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.color.get(),
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: theme.background.get(),
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function App() {
  return (
    <AppProvider>
      <ThemedNavigationContainer />
    </AppProvider>
  );
}
