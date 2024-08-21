import { Pressable, Text, View } from "react-native";
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
      <View style={{ padding: 10, backgroundColor: "#eee" }}>
        <Text>{props.movie.title}</Text>
      </View>
    </Pressable>
  );
}
