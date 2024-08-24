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

export function useFormScroll() {
  const focusedInputRef = useRef<TextInput | null>(null);
  const [layoutEmitter] = useState(() => new LayoutEmitter());
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
        const { endCoordinates, duration } = event;
        futureKeyboardHeight.value = endCoordinates.height;
        // TODO: Remove this
        const startTime = Date.now();
        // This will resolve either on the next layout of the keyboard spacer or
        // when the keyboard has finished its animation, whichever happens
        // first.
        const layoutPromise = new Promise<void>((resolve) => {
          layoutEmitter.onNextLayout(resolve, { timeout: duration });
        });
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
      onLayout={() => layoutEmitter.emitLayout()}
      style={{ height: spaceForKeyboard }}
    />
  );

  return { animatedScrollViewRef, onFocus, onBlur, keyboardSpacer };
}

class LayoutEmitter {
  listeners = new Set<() => void>();

  emitLayout() {
    this.listeners.forEach((listener) => listener());
  }

  onNextLayout(listener: () => void, options: { timeout: number }) {
    const listenerWithCleanup = () => {
      clearTimeout(timeoutId);
      this.listeners.delete(listenerWithCleanup);
      listener();
    };
    this.listeners.add(listenerWithCleanup);
    const timeoutId = setTimeout(listenerWithCleanup, options.timeout);
  }
}
