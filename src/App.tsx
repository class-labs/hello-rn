import { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

export function App() {
  const [firstName, setFirstName] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text>Enter your first name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#9d9d9d",
            borderRadius: 4,
            padding: 10,
            minWidth: 180,
          }}
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={(newValue) => {
            setFirstName(newValue);
          }}
        />
        <View style={{ alignItems: "flex-end" }}>
          <Button
            onPress={() => {
              Alert.alert(`Hello "${firstName}"`);
              setFirstName("");
            }}
            title="Submit"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
