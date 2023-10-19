import {
  TextInput as TextInputBase,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useTheme } from "../support/ThemeProvider";

type Props = TextInputProps;

export function TextInput(props: Props) {
  const theme = useTheme();
  const { style, ...otherProps } = props;
  return (
    <TextInputBase
      style={[styles.base, { fontSize: theme.fontSize }, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#999",
    paddingHorizontal: 16,
  },
});
