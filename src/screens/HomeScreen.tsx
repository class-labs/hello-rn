import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}
