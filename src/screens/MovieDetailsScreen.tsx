import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function MovieDetailsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text>TODO: Movie details will go here</Text>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
