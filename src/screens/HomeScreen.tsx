import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HomeScreen() {
  const distance = useSharedValue(0);

  const specialStyle = useAnimatedStyle(() => {
    return {
      // TODO: What style should change in response to the shared value?
    };
  });

  const onBoxPress = () => {
    // TODO: kick off the animation
    // You'll need to describe how `distance` changes over time.
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 120, height: 120 }}>
          <AnimatedPressable
            style={[specialStyle, styles.box]}
            onPress={onBoxPress}
          >
            <Text style={styles.boxText}>4</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[specialStyle, styles.box]}
            onPress={onBoxPress}
          >
            <Text style={styles.boxText}>3</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[specialStyle, styles.box]}
            onPress={onBoxPress}
          >
            <Text style={styles.boxText}>2</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[specialStyle, styles.box]}
            onPress={onBoxPress}
          >
            <Text style={styles.boxText}>1</Text>
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    backgroundColor: "#4E46DC",
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    color: "white",
    fontSize: 24,
  },
});
