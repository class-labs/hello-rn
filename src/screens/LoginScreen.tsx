import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export function LoginScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button
        title="Simulate successful login"
        onPress={() => {
          navigation.replace("Main");
        }}
      />
    </View>
  );
}
