import { View, StyleSheet, ViewProps } from "react-native";

type Props = ViewProps;

export function Form(props: Props) {
  const { style, ...otherProps } = props;
  return <View style={[styles.base, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "column",
    flex: 1,
  },
});
