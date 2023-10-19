import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { useTheme } from "../support/ThemeProvider";

type Props = Omit<PressableProps, "children"> & {
  textStyle?: StyleProp<TextStyle>;
  children: string;
};

export function Button(props: Props) {
  const { style, textStyle, ...otherProps } = props;
  const theme = useTheme();
  return (
    <Pressable
      {...otherProps}
      style={(state) => {
        const customStyle = typeof style === "function" ? style(state) : style;
        return [
          styles.container,
          { opacity: state.pressed ? 0.7 : 1 },
          customStyle,
        ];
      }}
    >
      <Text style={[styles.text, { fontSize: theme.fontSize }, textStyle]}>
        {props.children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4E46DC",
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignSelf: "stretch",
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
