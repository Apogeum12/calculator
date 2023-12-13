export function getTheme() {
  const getThemeFromlocalStorage =
    localStorage.getItem("isDarkMode") || undefined;

  if (!getThemeFromlocalStorage) return false;
  if (/true/i.test(getThemeFromlocalStorage)) {
    return true;
  } else return false;
}
