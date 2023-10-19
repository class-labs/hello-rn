import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HomeScreen() {
  const distance = useSharedValue(0);
  const items = Array.from({ length: 4 });
  const [currentlyTop, setCurrentlyTop] = useState(3);

  const specialStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: distance.value }],
    };
  });

  const onBoxPress = () => {
    distance.value = 0;
    distance.value = withTiming(400, {
      duration: 300,
      easing: Easing.in(Easing.quad),
    });
    setTimeout(() => {
      setCurrentlyTop((value) => value - 1);
    }, 300);
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
          {items.map((_, index) =>
            index > currentlyTop ? null : (
              <AnimatedPressable
                key={index}
                style={[index === currentlyTop && specialStyle, styles.box]}
                onPress={index === currentlyTop ? onBoxPress : undefined}
              >
                <Text style={styles.boxText}>{4 - index}</Text>
              </AnimatedPressable>
            ),
          )}
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
