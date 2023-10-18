import { createBox, createText } from "@shopify/restyle";
import { Theme } from "../theme";

const Box = createBox<Theme>();
const Text = createText<Theme>();

export function Home() {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      alignItems="center"
      justifyContent="center"
    >
      <Text>Hello World!</Text>
    </Box>
  );
}
