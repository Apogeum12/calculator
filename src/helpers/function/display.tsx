import { Setter } from "solid-js";

/**
 * Checks if the given string matches the theme change to 'dark' or 'light'.
 *
 * @param {string} val The string to check.
 * @returns {boolean} Returns true if the string matches 'dark' or 'light'; otherwise false.
 * @example 
  val = "2*dark";
  const result = isThemeChange(val);
  console.log(result); // true
 `
 */
export const isThemeChange = (val: string) => {
  return /dark|light/i.test(val) ? true : false;
};
// ----------------------------------------------------------------------------------------- //

/**
 * Switches the theme based on the formula input and updates the state.
 *
 * @param {string} val The string to detect theme to set.
 * @param {Setter<boolean>} isDarkMode  Function that sets the state of the theme.
 */
export const switchTheme = (val: string, isDarkMode: Setter<boolean>) => {
  if (/dark/i.test(val)) {
    localStorage.setItem("isDarkMode", "true");
    isDarkMode(true);
  } else if (/light/i.test(val)) {
    localStorage.setItem("isDarkMode", "false");
    isDarkMode(false);
  }
};
// ----------------------------------------------------------------------------------------- //

/**
 * It replace all commas to dots.
 *
 * @param {string} val The string to detect of commas and replace
 * @returns {string} New formula only with dots.
 */
export const switchToDots = (val: string) => {
  return val.replace(/,/gm, ".");
};
// ----------------------------------------------------------------------------------------- //

//! TODO
export const preProcessingFormula = (val: string) => {
  const cleanningRegex = new RegExp(
    /%|√|sin\d+(\.\d+)?|tan\d+(\.\d+)?|\/|\*|[0-9]|-|\+|\.|\,/,
    "gim"
  );
  return val.replace(cleanningRegex, "").length > 0;
};

export const parseFunctionForRust = (val: string) => {
  // --- Find and replace Int number to float in '/' operation
  const findDivision = new RegExp(/(\d+)\/(\d+)/, "g");
  const replaceFloat = (_match: any, num1: any, num2: any) => {
    return `${num1}/${parseFloat(num2).toFixed(1)}`;
  };
  let new_val = val.replace(findDivision, replaceFloat);

  // --- Replace Sin and Tan
  const add_multiply = new RegExp(/(\d+)(sin|tan|√)/, "g");
  new_val = new_val.replace(add_multiply, "$1*$2");

  const regex_t = new RegExp(/(sin|tan)(\d+(\.\d+)?)/, "g");
  new_val = new_val.replace(regex_t, "math::$1($2)");

  // --- Replace Sqrt
  const regex_m = new RegExp(/(√)(\d+(\.\d+)?)/, "g");
  return new_val.replace(regex_m, "math::sqrt($2)");
};
