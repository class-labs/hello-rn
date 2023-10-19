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
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const specialStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ rotate: `${rotation.value}deg` }],
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
          rotation.value = 0;
          rotation.value = withTiming(360, {
            duration: 500,
            easing: Easing.inOut(Easing.quad),
          });
          opacity.value = withSequence(
            withTiming(0, { duration: 250 }),
            withTiming(1, { duration: 250 }),
          );
        }}
      >
        Animate
      </Button>
    </View>
  );
}
