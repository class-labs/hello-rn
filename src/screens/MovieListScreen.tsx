import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MovieListItem } from "../components/MovieListItem";
import { movies } from "../data/movies";

export function MovieListScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          gap: 20,
        }}
      >
        {movies.map((movie) => (
          <MovieListItem key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}
