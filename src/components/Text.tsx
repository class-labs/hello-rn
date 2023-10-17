import { StyleSheet, Text as TextBase, TextProps } from "react-native";

type Props = TextProps & {
  variant?: string;
};

export function Text(props: Props) {
  const { style, variant, ...otherProps } = props;
  return <TextBase style={[styles.primary, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  primary: {
    fontSize: 26,
    color: "red",
  },
});
