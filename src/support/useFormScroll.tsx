import { useEffect, useMemo, useRef } from "react";
import {
  Keyboard,
  LayoutRectangle,
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
    const abortController = new AbortController();

    const componentUnmountedPromise = new Promise<undefined>((resolve) => {
      abortController.signal.addEventListener("abort", () => {
        resolve(undefined);
      });
    });

    const nextKeyboardDidShow = () => {
      return new Promise<undefined>((resolve) => {
        const cleanup = () => {
          subscription.remove();
        };
        const subscription = Keyboard.addListener("keyboardDidShow", () => {
          cleanup();
          resolve(undefined);
        });
      });
    };

    const willShowSubscription = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        const { endCoordinates } = event;
        const element = focusedInputRef.current;
        if (!element) {
          return;
        }

        const scrollStartOffset = currentScrollY.value;

        Promise.race([
          weakMap.get(element) ?? measureInWindow(element),
          nextKeyboardDidShow(),
          componentUnmountedPromise,
        ]).then((result) => {
          if (!result) {
            return;
          }
          const { y, height } = result;
          futureKeyboardHeight.value = endCoordinates.height;
          futureKeyboardTopPos.value = endCoordinates.screenY;
          scrollAnimationStartOffset.value = scrollStartOffset;
          scrollAnimationElBottom.value = y + height;
        });
      },
    );

    const didShowSubscription = Keyboard.addListener("keyboardDidShow", () => {
      futureKeyboardHeight.value = 0;
      futureKeyboardTopPos.value = 0;
      scrollAnimationStartOffset.value = 0;
      scrollAnimationElBottom.value = 0;
    });

    return () => {
      abortController.abort();
      willShowSubscription.remove();
      didShowSubscription.remove();
    };
  }, []);

  const { weakMap, onFocus, onBlur } = useMemo(() => {
    const weakMap = new WeakMap<TextInput, Promise<LayoutRectangle>>();

    const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const focusedInput = event.target as TextInput;
      focusedInputRef.current = focusedInput;
      weakMap.set(focusedInput, measureInWindow(focusedInput));
    };

    const onBlur = () => {
      const focusedInput = focusedInputRef.current;
      if (focusedInput) {
        weakMap.delete(focusedInput);
      }
      focusedInputRef.current = null;
    };

    return { weakMap, onFocus, onBlur };
  }, []);

  const keyboardSpacer = <Animated.View style={{ height: keyboard.height }} />;

  return {
    animatedScrollViewRef,
    animatedProps,
    onFocus,
    onBlur,
    keyboardSpacer,
  };
}

function measureInWindow(el: TextInput) {
  return new Promise<LayoutRectangle>((resolve) => {
    el.measureInWindow((x, y, width, height) => {
      resolve({ x, y, width, height });
    });
  });
}
