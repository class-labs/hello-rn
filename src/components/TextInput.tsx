import { forwardRef } from "react";
import {
  TextInput as TextInputBase,
  StyleSheet,
  TextInputProps,
} from "react-native";

type Props = TextInputProps;

export const TextInput = forwardRef<TextInputBase, Props>((props, ref) => {
  const { style, ...otherProps } = props;
  return (
    <TextInputBase ref={ref} style={[styles.base, style]} {...otherProps} />
  );
});

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#999",
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
