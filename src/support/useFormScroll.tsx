import { useEffect, useRef, useState } from "react";
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

import { EventEmitter } from "./EventEmitter";

export function useFormScroll() {
  const focusedInputRef = useRef<TextInput | null>(null);
  const [layoutEmitter] = useState(() => new EventEmitter<{ layout: [] }>());
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
        const startTime = Date.now();
        // TODO: The maximum wait time should be event.duration
        const layoutPromise = new Promise<void>((resolve) => {
          layoutEmitter.once("layout", resolve);
        });
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
          // We need to defer the scroll until the spacer at the bottom of the
          // ScrollView has time to render, otherwise our scrollTo will fail in
          // cases where there isn't enough available content to scroll.
          layoutPromise.then(() => {
            console.log(`Time to layout: ${Date.now() - startTime}`);
            runOnUI(scrollByAmount)(amountToScroll);
          });
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

  const keyboardSpacer = (
    <Animated.View
      onLayout={() => layoutEmitter.emit("layout")}
      style={{ height: spaceForKeyboard }}
    />
  );

  return { animatedScrollViewRef, onFocus, onBlur, keyboardSpacer };
}
