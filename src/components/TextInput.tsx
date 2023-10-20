import {
  TextInput as TextInputBase,
  StyleSheet,
  TextInputProps,
} from "react-native";

type Props = TextInputProps;

export function TextInput(props: Props) {
  const { style, ...otherProps } = props;
  return <TextInputBase style={[styles.base, style]} {...otherProps} />;
}

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
