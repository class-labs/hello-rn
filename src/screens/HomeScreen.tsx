import { Text, View } from "react-native";
import { gql } from "@apollo/client";

// Task 18
// Query the list of posts from GraphQL and display them on the screen in a
// simple FlatList

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author {
        id
        name
      }
      content
      likeCount
    }
  }
`;

export function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}
