import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function HomeScreen() {
  const scale = useSharedValue(1);

  const specialStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const pan = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1, {
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
