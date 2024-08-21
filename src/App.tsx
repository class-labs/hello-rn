import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { MovieDetailsScreen } from "./screens/MovieDetailsScreen";
import { MovieListScreen } from "./screens/MovieListScreen";

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: "black",
            contentStyle: {
              backgroundColor: "white",
            },
          }}
        >
          <Stack.Screen
            name="MovieList"
            options={{ headerShown: false }}
            component={MovieListScreen}
          />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
