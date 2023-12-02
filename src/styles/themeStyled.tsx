export const themeStyled = (isDark: boolean): styledTheme => {
  return isDark ? DarkTheme : LightTheme;
};

const DarkTheme: styledTheme = {
  cos: "",
};
const LightTheme: styledTheme = {
  cos: "",
};

export interface styledTheme {
  cos: string;
}
