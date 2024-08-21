import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
};

type Props = {
  movie: Movie;
};

export function MovieListItem(props: Props) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate("MovieDetails");
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
