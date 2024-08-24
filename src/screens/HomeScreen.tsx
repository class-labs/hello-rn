import { Platform } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, Label, Paragraph, TextArea, View } from "tamagui";

import { useFormScroll } from "../support/useFormScroll";

export function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const {
    animatedScrollViewRef,
    animatedProps,
    onFocus,
    onBlur,
    keyboardSpacer,
  } = useFormScroll();

  return (
    <Animated.ScrollView
      ref={animatedScrollViewRef}
      animatedProps={animatedProps}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
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
            onFocus={onFocus}
            onBlur={onBlur}
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your name"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Email</Label>
          <Input
            onFocus={onFocus}
            onBlur={onBlur}
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
            onFocus={onFocus}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your username"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Password</Label>
          <Input
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={true}
            returnKeyType="done"
            placeholder="Enter your password"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Notes</Label>
          <TextArea
            onFocus={onFocus}
            onBlur={onBlur}
            minHeight={180}
            placeholder="Enter notes"
          />
        </View>
        <View gap={4}>
          <Label lineHeight={26}>Favorite color</Label>
          <Input
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType="done"
            placeholder="Enter a color"
          />
        </View>
        <Button theme="blue" onPress={() => {}}>
          Sign Up
        </Button>
        {keyboardSpacer}
      </View>
    </Animated.ScrollView>
  );
}
