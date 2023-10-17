import { Alert, StyleSheet, View } from "react-native";
import { Button } from "./components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          Alert.alert("Hello!");
        }}
      >
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
