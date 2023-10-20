import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./screens/MainScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SessionProvider } from "./support/SessionProvider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: "https://chatter.web-api.dev/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Main"
              options={{ headerShown: false }}
              component={MainScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SessionProvider>
    </ApolloProvider>
  );
}
