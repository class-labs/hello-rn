import { useEffect, useRef } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
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

export function useFormScroll() {
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

  const keyboardSpacer = <Animated.View style={{ height: spaceForKeyboard }} />;

  return { animatedScrollViewRef, onFocus, onBlur, keyboardSpacer };
}
