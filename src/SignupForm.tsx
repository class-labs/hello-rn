import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  onSuccess: () => void;
};

export function SignupForm(props: Props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ paddingHorizontal: 20, gap: 10 }}>
      <View style={{ marginVertical: 14 }}>
        <Text style={{ fontSize: 32 }}>Sign in to your account</Text>
      </View>
      <Text style={styles.textFieldLabel}>Email address</Text>
      <TextInput
        style={styles.textFieldInput}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <Text style={styles.textFieldLabel}>Password</Text>
      <TextInput
        style={styles.textFieldInput}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.horizontalFieldRow}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <View style={styles.checkBox} />
          <Text style={{ fontSize: 16 }}>Remember me</Text>
        </View>
        <Text style={{ fontSize: 16, color: "#4E46DC", fontWeight: "bold" }}>
          Forgot password?
        </Text>
      </View>
      <Pressable
        style={styles.submitButton}
        onPress={() => {
          if (emailAddress === "bob@example.com" && password === "123") {
            props.onSuccess();
          } else {
            Alert.alert("Invalid login");
          }
        }}
      >
        <Text style={styles.submitButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textFieldLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  textFieldInput: {
    borderWidth: 1,
    borderColor: "#6b7280",
    padding: 10,
    borderRadius: 8,
  },
  horizontalFieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#6b7280",
    borderRadius: 3,
  },
  submitButton: {
    padding: 14,
    backgroundColor: "#4E46DC",
    borderRadius: 8,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
