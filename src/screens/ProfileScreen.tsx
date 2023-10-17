import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RootStackParamList } from "../types/navigation";

type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

export function ProfileScreen() {
  const route = useRoute<ProfileRouteProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile for {route.params.username}</Text>
    </View>
  );
}
