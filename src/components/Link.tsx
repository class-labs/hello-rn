import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextProps } from "react-native";
import { Text } from "./Text";

type Props = TextProps & {
  to: string;
};

export function Link(props: Props) {
  const { to, style, ...otherProps } = props;
  const navigation = useNavigation<any>();
  return (
    <Text
      style={[styles.base, style]}
      onPress={() => {
        navigation.navigate(to);
      }}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: "#4E46DC",
    textDecorationLine: "underline",
  },
});
