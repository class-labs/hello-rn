import { FlatList, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Text } from "../components/Text";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author {
        id
        name
        username
      }
      content
      likeCount
    }
  }
`;

export function HomeScreen() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (error) {
    return <Text style={{ color: "red" }}>{String(error)}</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const posts = data.posts ?? [];

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "#ddd" }}
      contentContainerStyle={{ padding: 20, gap: 20 }}
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item: post }) => (
        <View
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 5,
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "500" }}>
            {post.author.name} (@{post.author.username})
          </Text>
          <Text>{post.content}</Text>
        </View>
      )}
    />
  );
}
