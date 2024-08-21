import { render } from "@testing-library/react-native";

import { ThemeProvider } from "../providers/ThemeProvider";
import { HomeScreen } from "../screens/HomeScreen";

describe("HomeScreen", () => {
  test("Text renders correctly on HomeScreen", () => {
    const { getByText } = render(
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>,
    );

    const textLabel = getByText("Hello world!");

    expect(textLabel).toBeTruthy();
  });
});
