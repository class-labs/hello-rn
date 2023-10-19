import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function HomeScreen() {
  const deltaX = useSharedValue(0);
  const deltaY = useSharedValue(0);

  const specialStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: deltaX.value }, { translateY: deltaY.value }],
    };
  });

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      deltaX.value = event.translationX;
      deltaY.value = event.translationY;
    })
    .onEnd(() => {
      deltaX.value = withTiming(0, {
        duration: 250,
        easing: Easing.inOut(Easing.cubic),
      });
      deltaY.value = withTiming(0, {
        duration: 250,
        easing: Easing.inOut(Easing.cubic),
      });
    });

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              specialStyle,
              { width: 120, height: 120, backgroundColor: "#4E46DC" },
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}
