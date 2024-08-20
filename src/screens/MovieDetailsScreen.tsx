import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export function MovieDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const movie = route.params.movie;

  useEffect(() => {
    navigation.setOptions({
      title: movie.title,
    });
  }, [navigation]);

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
