import { Button, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { movies } from "../data/movies";
import { Movie } from "../types/Movie";

export function MovieListScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ padding: 20, gap: 20 }}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}

type Props = {
  movie: Movie;
};

function MovieItem(props: Props) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate("MovieDetails", { movie: props.movie });
      }}
    >
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "#d7d7d7",
          borderRadius: 7,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: props.movie.poster_path }}
          style={{ width: 60, height: 100 }}
          resizeMode="cover"
        />
        <View style={{ gap: 8, flexShrink: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{props.movie.title}</Text>
          <Text>Release date: {props.movie.release_date}</Text>
          <Text>Rating: {props.movie.vote_average}</Text>
        </View>
      </View>
    </Pressable>
  );
}
