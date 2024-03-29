/** @type {import('tailwindcss').Config} */
import * as colors from "tailwindcss/colors";
import { createThemes } from "tw-colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      spacing: {
        xs: "0.25em",
        sm: "0.75em",
        md: "1em",
        lg: "1.5em",
        xl: "2em",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        primary: colors.cyan[700],
        secondary: colors.cyan[400],
        tertiary: colors.cyan[200],
        background: colors.white,
      },
      dark: {
        primary: colors.cyan[200],
        secondary: colors.cyan[400],
        tertiary: colors.cyan[700],
        background: colors.cyan[950],
      },
      mono: {
        primary: colors.black,
        secondary: colors.black,
        tertiary: colors.white,
        background: colors.white,
      },
      "mono-slate": {
        primary: colors.slate[800],
        secondary: colors.slate[800],
        tertiary: colors.slate[50],
        background: colors.slate[50],
      },
    }),
  ],
};
