import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function AboutScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Button
        title="Go to Home"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
