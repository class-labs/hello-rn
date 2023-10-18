import {
  SpacingProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { TextInput as TextInputBase } from "react-native";
import { Theme } from "../theme";

type Props = SpacingProps<Theme> & VariantProps<Theme, "textInputVariants">;

export const TextInput = createRestyleComponent<Props, Theme>(
  [createVariant({ themeKey: "textInputVariants" })],
  TextInputBase,
);
