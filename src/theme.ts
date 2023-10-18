import { createTheme } from "@shopify/restyle";

const palette = {
  purple: "#5A31F4",
  green: "#099C77",
  black: "#101010",
  white: "#FFF",
};

export const theme = createTheme({
  colors: {
    background: palette.white,
    title: palette.black,
    text: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: "text",
    },
    header: {
      fontSize: 48,
      fontWeight: "bold",
      color: "title",
    },
    body: {
      fontSize: 16,
    },
  },
});

export type Theme = typeof theme;
