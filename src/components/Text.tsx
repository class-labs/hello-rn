import { Text as TextBase, StyleSheet, TextProps } from "react-native";

type Props = TextProps;

export function Text(props: Props) {
  const { style, ...otherProps } = props;
  return <TextBase style={[styles.base, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
  },
});
