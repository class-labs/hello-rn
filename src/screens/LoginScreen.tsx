import { Form } from "../components/Form";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { Link } from "../components/Link";

export function LoginScreen() {
  return (
    <Form style={{ gap: 20, padding: 20, backgroundColor: "white" }}>
      <TextInput placeholder="Enter your username" />
      <TextInput placeholder="Enter your password" secureTextEntry={true} />
      <Button>Submit</Button>
      <Text>
        Don't have an account? <Link to="Signup">Sign up</Link>
      </Text>
    </Form>
  );
}
