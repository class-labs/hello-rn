import {
  ScrollView,
  TextInput as RNTextInput,
  Alert,
  Keyboard,
} from "react-native";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { Link } from "../components/Link";
import { Form } from "../components/Form";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

export function SignupScreen() {
  const inputEmailRef = useRef<RNTextInput>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submitted:", data);
    Alert.alert("Thanks!");
    Keyboard.dismiss();
  });

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
    >
      <Form style={{ gap: 20, padding: 20 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                inputEmailRef.current?.focus();
              }}
            />
          )}
        />
        {errors.name && <Text style={{ color: "red" }}>This is required.</Text>}

        <Controller
          control={control}
          name="emailAddress"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={inputEmailRef}
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              returnKeyType="next"
            />
          )}
        />
        {errors.emailAddress && (
          <Text style={{ color: "red" }}>This is required.</Text>
        )}

        <TextInput placeholder="Enter your phone number" />
        <TextInput placeholder="Enter your password" secureTextEntry={true} />
        <TextInput
          placeholder="Enter your password again"
          secureTextEntry={true}
        />
        <Button onPress={onSubmit}>Submit</Button>
        <Text>
          Don't have an account? <Link to="Signup">Sign up</Link>
        </Text>
      </Form>
    </ScrollView>
  );
}
