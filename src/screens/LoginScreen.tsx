import { useNavigation } from "@react-navigation/native";
import { Form } from "../components/Form";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useState } from "react";
import { Text } from "../components/Text";
import { useSession } from "../support/SessionProvider";

// Task 17
// Setup GraphQL mutation for Login

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setSession } = useSession();

  const onSubmit = () => {
    // TODO: Invoke GraphQL mutation login()
  };

  return (
    <Form style={{ gap: 20, padding: 20, backgroundColor: "white" }}>
      {error ? <Text style={{ color: "red" }}>{error.message}</Text> : null}
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={(value) => setUsername(value)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />
      <Button disabled={loading} onPress={onSubmit}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </Form>
  );
}
