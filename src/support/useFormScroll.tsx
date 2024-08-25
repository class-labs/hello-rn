import { useEffect, useRef } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from "react-native";
import Animated, {
  Easing,
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedProps,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
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
  const currentScrollY = useScrollViewOffset(animatedScrollViewRef);
  const offsetY = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      contentOffset: { y: offsetY.value, x: 0 },
    };
  });

  useEffect(() => {
    const scrollToPosition = (scrollTo: number, duration: number) => {
      offsetY.value = currentScrollY.value;
      offsetY.value = withTiming(scrollTo, {
        duration,
        // TODO: Tweak this
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    };
    const scrollByAmount = (amountToScroll: number, duration: number) => {
      const currentScrollOffset = currentScrollY.value;
      const targetScrollOffset = currentScrollOffset + amountToScroll;
      console.log(`Current scroll offset: ${currentScrollOffset}`);
      console.log(`Amount to scroll: ${amountToScroll}`);
      console.log(`Scroll to: ${targetScrollOffset}`);
      scrollToPosition(targetScrollOffset, duration);
    };
    const showSubscription = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        const { endCoordinates, duration } = event;
        futureKeyboardHeight.value = endCoordinates.height;
        const element = focusedInputRef.current;
        if (!element) {
          return;
        }
        const keyboardTopPosition = endCoordinates.screenY;
        element.measureInWindow((x, y, width, height) => {
          const elementBottomPosition = y + height;
          if (elementBottomPosition <= keyboardTopPosition) {
            return;
          }
          const amountToScroll = elementBottomPosition - keyboardTopPosition;
          scrollByAmount(amountToScroll, duration);
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

  return {
    animatedScrollViewRef,
    animatedProps,
    onFocus,
    onBlur,
    keyboardSpacer,
  };
}
