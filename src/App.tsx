import { Alert, StyleSheet, View } from "react-native";
import { Text } from "./components/Text";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{ fontStyle: "italic" }}
        onPress={() => {
          Alert.alert("Hello");
        }}
      >
        Hello world!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
