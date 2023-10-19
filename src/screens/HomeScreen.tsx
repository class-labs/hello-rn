import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

export function HomeScreen() {
  const progress = useSharedValue(0);

  const scrollIndicatorStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  const items = Array.from({ length: 30 });

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset, contentSize, layoutMeasurement }) => {
      const scrollPosY = Math.max(contentOffset.y, 0);
      const scrollViewHeight = layoutMeasurement.height;
      const contentHeight = contentSize.height;
      const maxScrollPosY = Math.max(contentHeight - scrollViewHeight, 0);
      progress.value = (scrollPosY / maxScrollPosY) * 100;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Animated.View
          style={[scrollIndicatorStyle, { height: 4, backgroundColor: "blue" }]}
        />
      </View>
      <Animated.ScrollView
        onScroll={onScroll}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{
          padding: 20,
          gap: 16,
        }}
        scrollEventThrottle={16}
      >
        {items.map((_, index) => (
          <Text key={index} style={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu
            justo, ultrices vel tempus vel, iaculis in risus. Praesent id sem
            erat. Pellentesque metus velit, lacinia nec efficitur ut, tempor et
            purus. Vestibulum lacus ex, dictum iaculis varius quis, gravida id
            justo. Nam malesuada aliquet turpis vel semper. Mauris tincidunt
            ligula sed purus congue interdum. Nunc aliquet turpis in dolor
            ullamcorper aliquet.
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
