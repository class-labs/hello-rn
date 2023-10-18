import { ThemeProvider } from "@shopify/restyle";

import { theme } from "./theme";
import { Home } from "./screens/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
