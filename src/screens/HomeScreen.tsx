import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Button
        title="Go to About"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("About");
        }}
      />
    </View>
  );
}
