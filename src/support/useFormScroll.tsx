import { useEffect, useRef } from "react";
import {
  EmitterSubscription,
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedProps,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

export function useFormScroll() {
  const animatedScrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const focusedInputRef = useRef<TextInput | null>(null);
  const keyboard = useAnimatedKeyboard();

  const currentScrollY = useScrollViewOffset(animatedScrollViewRef);

  // The following 4 pieces of information is what we need to accurately scroll
  // the element into view while the keyboard is animating into position.
  const futureKeyboardHeight = useSharedValue(0);
  const futureKeyboardTopPos = useSharedValue(0);
  const scrollAnimationStartOffset = useSharedValue(0);
  const scrollAnimationElBottom = useSharedValue(0);

  const offsetY = useDerivedValue<number | undefined>(() => {
    const elementBottomPosition = scrollAnimationElBottom.value;
    const endKeyboardTop = futureKeyboardTopPos.value;
    const endKeyboardHeight = futureKeyboardHeight.value;
    const currentKeyboardHeight = Math.max(keyboard.height.value, 0);
    if (!currentKeyboardHeight || !endKeyboardHeight) {
      return;
    }
    const currentKeyboardTop =
      endKeyboardTop + (endKeyboardHeight - currentKeyboardHeight);
    if (currentKeyboardTop > elementBottomPosition) {
      return;
    }
    const scrollBy = elementBottomPosition - currentKeyboardTop;
    return scrollBy + scrollAnimationStartOffset.value;
  });

  const animatedProps = useAnimatedProps(() => {
    const y = offsetY.value;
    return {
      contentOffset: y === undefined ? undefined : { y, x: 0 },
    };
  });

  useEffect(() => {
    const subscriptions = new Set<EmitterSubscription>();

    const onNextDidShow = (callback: () => void) => {
      const cleanup = () => {
        subscriptions.delete(subscription);
        subscription.remove();
      };
      const subscription = Keyboard.addListener("keyboardDidShow", () => {
        cleanup();
        callback();
      });
      subscriptions.add(subscription);
      return cleanup;
    };

    subscriptions.add(
      Keyboard.addListener("keyboardWillShow", (event) => {
        console.log("keyboardWillShow");
        const { endCoordinates } = event;
        const element = focusedInputRef.current;
        if (!element) {
          return;
        }
        const scrollStartOffset = currentScrollY.value;
        const startTime = Date.now();
        let shouldCancel = false;
        const cleanup = onNextDidShow(() => {
          shouldCancel = true;
        });

        element.measureInWindow((x, y, width, height) => {
          if (shouldCancel) {
            return;
          }
          cleanup();
          futureKeyboardHeight.value = endCoordinates.height;
          futureKeyboardTopPos.value = endCoordinates.screenY;
          scrollAnimationStartOffset.value = scrollStartOffset;
          scrollAnimationElBottom.value = y + height;
          console.log({
            _time: Date.now() - startTime,
            futureKeyboardHeight: endCoordinates.height,
            futureKeyboardTopPos: endCoordinates.screenY,
            scrollAnimationStartOffset: scrollStartOffset,
            scrollAnimationElBottom: y + height,
          });
        });
      }),
    );

    subscriptions.add(
      Keyboard.addListener("keyboardDidShow", () => {
        console.log("keyboardDidShow");
        futureKeyboardHeight.value = 0;
        futureKeyboardTopPos.value = 0;
        scrollAnimationStartOffset.value = 0;
        scrollAnimationElBottom.value = 0;
      }),
    );
    return () => {
      for (const subscription of subscriptions) {
        subscription.remove();
      }
    };
  }, []);

  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    focusedInputRef.current = event.target as TextInput;
  };
  const onBlur = () => {
    focusedInputRef.current = null;
  };

  const keyboardSpacer = <Animated.View style={{ height: keyboard.height }} />;

  return {
    animatedScrollViewRef,
    animatedProps,
    onFocus,
    onBlur,
    keyboardSpacer,
  };
}
