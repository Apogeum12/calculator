import { Setter } from "solid-js";

export function getTheme(setIsDark: Setter<boolean>) {
  const getThemeFromlocalStorage = localStorage.getItem("themeType") || "dark";
  if (/dark/i.test(getThemeFromlocalStorage)) {
    setIsDark(true);
  } else setIsDark(false);
}
