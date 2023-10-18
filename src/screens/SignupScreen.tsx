import { ScrollView, TextInput as RNTextInput } from "react-native";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { Link } from "../components/Link";
import { Form } from "../components/Form";
import { useRef } from "react";

export function SignupScreen() {
  const inputEmailRef = useRef<RNTextInput>(null);
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Form style={{ gap: 20, padding: 20 }}>
        <TextInput
          placeholder="Enter your name"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => {
            inputEmailRef.current?.focus();
          }}
        />
        <TextInput
          ref={inputEmailRef}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          returnKeyType="next"
        />
        <TextInput placeholder="Enter your phone number" />
        <TextInput placeholder="Enter your password" secureTextEntry={true} />
        <TextInput
          placeholder="Enter your password again"
          secureTextEntry={true}
        />
        <Button>Submit</Button>
        <Text>
          Don't have an account? <Link to="Signup">Sign up</Link>
        </Text>
      </Form>
    </ScrollView>
  );
}
