import { useNavigation } from "@react-navigation/native";
import { Form } from "../components/Form";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

// Task 15
// Connect this form so that it will validate the username/password using the
// `login()` function from `auth.ts`
// If the login fails, display "Invalid username or password"
// Otherwise redirect to the Home screen.

export function LoginScreen() {
  const navigation = useNavigation<any>();
  return (
    <Form style={{ gap: 20, padding: 20, backgroundColor: "white" }}>
      <TextInput placeholder="Enter your username" />
      <TextInput placeholder="Enter your password" secureTextEntry={true} />
      <Button>Submit</Button>
    </Form>
  );
}
