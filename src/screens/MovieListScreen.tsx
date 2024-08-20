import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { movies } from "../data/movies";

// Task 10
// Render the list of movies here. Don't worry about styling for now.
// When the user taps on a movie, we should navigate to the MovieDetails screen.
// For this task, don't change the MovieDetails screen at all.
// We're just implementing this MovieList screen here.
export function MovieListScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text>TODO: Movie list will go here</Text>
    </View>
  );
}
