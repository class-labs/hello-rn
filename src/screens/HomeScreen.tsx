import { Platform } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, Paragraph, styled, TextArea, View } from "tamagui";

import { useFormScroll } from "../support/useFormScroll";

const Label = styled(Paragraph, { lineHeight: 26 });

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
          <Label>Name</Label>
          <Input
            onFocus={onFocus}
            onBlur={onBlur}
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your name"
          />
        </View>
        <View gap={4}>
          <Label>Email</Label>
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
          <Label>Username</Label>
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
          <Label>Password</Label>
          <Input
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={true}
            returnKeyType="done"
            placeholder="Enter your password"
          />
        </View>
        <View gap={4}>
          <Label>Notes</Label>
          <TextArea
            onFocus={onFocus}
            onBlur={onBlur}
            minHeight={180}
            placeholder="Enter notes"
          />
        </View>
        <View gap={4}>
          <Label>Favorite color</Label>
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
