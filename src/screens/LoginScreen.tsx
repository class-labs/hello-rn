import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

// Task 6
// Build a simple login form. You can use the following as an example:
// https://github.com/sstur/sstur/assets/369384/50f9928e-d245-465c-921f-de01d2559c88
// Does not need to submit to a real server. Just redirect to the main page on submit.

export function LoginScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Form will go here</Text>
    </View>
  );
}
