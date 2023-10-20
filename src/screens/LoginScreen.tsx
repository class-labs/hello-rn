import { useNavigation } from "@react-navigation/native";
import { Form } from "../components/Form";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

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
