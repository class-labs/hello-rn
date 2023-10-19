import { Text as TextBase, TextProps } from "react-native";
import { useTheme } from "../support/ThemeProvider";

type Props = TextProps;

export function Text(props: Props) {
  const theme = useTheme();
  const { style, ...otherProps } = props;
  return (
    <TextBase style={[{ fontSize: theme.fontSize }, style]} {...otherProps} />
  );
}
