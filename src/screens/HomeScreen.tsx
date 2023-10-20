import { Text, View } from "react-native";
import { useSession } from "../support/SessionProvider";

export function HomeScreen() {
  const { session } = useSession();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>You are logged in as {session?.user.name}</Text>
    </View>
  );
}
