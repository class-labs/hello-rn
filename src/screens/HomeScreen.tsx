import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { Button } from "../components/Button";

export function HomeScreen() {
  const position = useSharedValue(0);

  const specialStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
    };
  });
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={[
            specialStyle,
            { width: 120, height: 120, backgroundColor: "#4E46DC" },
          ]}
        />
      </View>
      <Button
        onPress={() => {
          position.value = withSequence(
            withTiming(200, {
              duration: 500,
              easing: Easing.inOut(Easing.quad),
            }),
            withTiming(0, {
              duration: 500,
              easing: Easing.inOut(Easing.quad),
            }),
          );
        }}
      >
        Animate
      </Button>
    </View>
  );
}
