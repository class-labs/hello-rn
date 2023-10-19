import { ReactNode, createContext, useContext, useState } from "react";

type Theme = {
  fontSize: number;
};

type ThemeContext = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

const defaultTheme = {
  fontSize: 16,
};

const Context = createContext<ThemeContext>({
  theme: defaultTheme,
  setTheme: () => {},
});

type Props = {
  children: ReactNode;
};

export function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState(defaultTheme);
  const context: ThemeContext = {
    theme,
    setTheme,
  };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function useTheme() {
  const { theme } = useContext(Context);
  return theme;
}

export function useSetTheme() {
  const { setTheme } = useContext(Context);
  return setTheme;
}
