import { Text, View } from "react-native";
import { Home } from "lucide-react-native";

export function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Home />
    </View>
  );
}
