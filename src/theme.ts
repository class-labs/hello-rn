import { createTheme } from "@shopify/restyle";

export const theme = createTheme({
  colors: {
    background: "#FFF",
    title: "#101010",
    text: "#101010",
    red: "#e00",
    grey: "#999",
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
      fontSize: 40,
      fontWeight: "bold",
      color: "title",
    },
    body: {
      fontSize: 16,
    },
  },
  textInputVariants: {
    defaults: {
      height: 40,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "grey",
      paddingHorizontal: "m",
      fontSize: 16,
    },
  },
});

export type Theme = typeof theme;
