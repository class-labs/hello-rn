import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  children: string;
  onPress?: () => void;
  borderRadius?: "sm" | "md" | "lg";
};

const borderRadii = {
  sm: 5,
  md: 10,
  lg: 16,
};

export function Button(props: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.7 : 1,
          borderRadius: borderRadii[props.borderRadius ?? "sm"],
        },
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.text]}>{props.children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4E46DC",
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignSelf: "stretch",
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
