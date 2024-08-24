import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Input,
  Label,
  Paragraph,
  ScrollView,
  TextArea,
  View,
} from "tamagui";

export function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View
        paddingHorizontal={16}
        paddingTop={20}
        paddingBottom={Math.max(safeAreaInsets.bottom, 20)}
        gap={20}
      >
        <Paragraph fontSize={15}>
          Welcome to our awesome app. Sign up below to create an account. By
          signing up you agree to our terms and services.
        </Paragraph>
        <View gap={4}>
          <Label lineHeight={26}>Name</Label>
          <Input
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your name"
            autoFocus={true}
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Email</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            keyboardType="email-address"
            placeholder="Enter your email address"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Username</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your username"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Password</Label>
          <Input
            secureTextEntry={true}
            returnKeyType="done"
            placeholder="Enter your password"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Notes</Label>
          <TextArea minHeight={180} placeholder="Enter notes" />
        </View>
        <Button theme="blue" onPress={() => {}}>
          Sign Up
        </Button>
      </View>
    </ScrollView>
  );
}
