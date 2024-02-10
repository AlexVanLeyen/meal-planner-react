import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/theme/app.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "theme-light",
      dark: "theme-dark",
      mono: "theme-mono",
      "mono-slate": "theme-mono-slate",
    },
    defaultTheme: "light",
  }),
];

export default preview;
