import { Pressable, Text, TextInput, View } from "react-native";

export function SignupForm() {
  return (
    <View style={{ paddingHorizontal: 20, gap: 10 }}>
      <Text style={{ fontSize: 32 }}>Sign in to your account</Text>
      <Text>Email address</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#9d9d9d", padding: 10 }}
      />
      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#9d9d9d", padding: 10 }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Remember me</Text>
        <Text>Forgot password?</Text>
      </View>
      <Pressable style={{ padding: 10, backgroundColor: "purple" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Sign in</Text>
      </Pressable>
    </View>
  );
}
