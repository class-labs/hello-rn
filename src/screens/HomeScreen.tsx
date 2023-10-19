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
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GestureDetector gesture={pan}>
          <Animated.Image
            source={{
              uri: "https://github.com/sstur/sstur/assets/369384/365fb8f3-4082-486a-9d31-eba4cf89dd11",
            }}
            style={[
              specialStyle,
              { width: "100%", aspectRatio: 1, backgroundColor: "#4E46DC" },
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}
