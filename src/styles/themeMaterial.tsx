import { createTheme } from "@suid/material";

export const themeMaterial = (isDark: boolean) => {
  return isDark ? DarkTheme : LightTheme;
};

const DarkTheme = createTheme({});
const LightTheme = createTheme({});
