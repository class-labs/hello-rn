import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <Button
        onPress={() => {
          setCount(count + 1);
        }}
        title="⬆️"
      />
      <Button
        onPress={() => {
          setCount(count - 1);
        }}
        title="⬇️"
      />
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
