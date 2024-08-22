import { useNavigation } from "@react-navigation/native";
import {
  Anchor,
  Button,
  Input,
  Label,
  Paragraph,
  ScrollView,
  TextArea,
  View,
} from "tamagui";

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View
        flex={1}
        paddingHorizontal={16}
        paddingTop={16}
        paddingBottom={24}
        gap={20}
      >
        <View gap={4}>
          <Label>Name</Label>
          <Input
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your name"
            autoFocus={true}
          />
        </View>
        <View gap={4}>
          <Label>Email</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            keyboardType="email-address"
            placeholder="Enter your email address"
          />
        </View>
        <View gap={4}>
          <Label>Username</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your username"
          />
        </View>
        <View gap={4}>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            returnKeyType="go"
            placeholder="Enter your password"
          />
        </View>
        <View gap={4}>
          <Label>Notes</Label>
          <TextArea minHeight={120} placeholder="Enter notes" />
        </View>
        <Button theme="blue" onPress={() => {}}>
          Sign Up
        </Button>
      </View>
    </ScrollView>
  );
}
