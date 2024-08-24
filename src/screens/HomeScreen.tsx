import { useEffect, useRef } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputFocusEventData,
} from "react-native";
import Animated, {
  KeyboardState,
  runOnUI,
  scrollTo,
  useAnimatedKeyboard,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, Label, Paragraph, TextArea, View } from "tamagui";

export function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const focusedInputRef = useRef<TextInput | null>(null);
  const keyboard = useAnimatedKeyboard();
  const futureKeyboardHeight = useSharedValue(0);
  const spaceForKeyboard = useDerivedValue(() => {
    if (keyboard.state.value === KeyboardState.OPENING) {
      return Math.max(keyboard.height.value, futureKeyboardHeight.value);
    }
    return keyboard.height.value;
  });

  const animatedScrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedScrollViewRef);

  useEffect(() => {
    const scrollByAmount = (amountToScroll: number) => {
      "worklet";
      const currentScrollOffset = scrollOffset.value;
      const targetScrollOffset = currentScrollOffset + amountToScroll;
      console.log(`Current scroll offset: ${currentScrollOffset}`);
      console.log(`Amount to scroll: ${amountToScroll}`);
      console.log(`Scroll to: ${targetScrollOffset}`);
      scrollTo(animatedScrollViewRef, 0, targetScrollOffset, true);
    };
    const showSubscription = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        const { endCoordinates } = event;
        futureKeyboardHeight.value = endCoordinates.height;
        const element = focusedInputRef.current;
        if (!element) {
          return;
        }
        console.log("Keyboard:", { endCoordinates });
        const keyboardTopPosition = endCoordinates.screenY;
        element.measureInWindow((x, y, width, height) => {
          console.log("Element:", { x, y, width, height });
          const elementBottomPosition = y + height;
          if (elementBottomPosition <= keyboardTopPosition) {
            console.log("No scroll needed.");
            return;
          }
          const amountToScroll = elementBottomPosition - keyboardTopPosition;
          // We need to defer this by a small amount so the spacer at the bottom
          // of the ScrollView has time to render, otherwise our scrollTo might
          // fail since there won't be enough available content to scroll.
          // TODO: Deterministically compute how long to wait.
          setTimeout(() => runOnUI(scrollByAmount)(amountToScroll), 10);
        });
      },
    );
    return () => {
      showSubscription.remove();
    };
  }, []);

  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    focusedInputRef.current = event.target as TextInput;
  };
  const onBlur = () => {
    focusedInputRef.current = null;
  };
  return (
    <Animated.ScrollView
      ref={animatedScrollViewRef}
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
          <TextArea minHeight={180} placeholder="Enter notes" />
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
        <Animated.View style={{ height: spaceForKeyboard }} />
      </View>
    </Animated.ScrollView>
  );
}
