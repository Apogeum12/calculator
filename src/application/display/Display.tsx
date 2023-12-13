import { Accessor, Setter, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

// --- Separately Component --- //
const DisplayContainer = styled.div`
  width: 100%;
  height: 30%;

  /* background-color: aqua; */
`;

interface DisplayProps {
  processingData: Accessor<string>;
  setIsDark: Setter<boolean>;
}
export const Display = (props: DisplayProps) => {
  createEffect(() => {
    if (props.processingData().length > 0) {
      const data = props.processingData();
      //? Detect theme change
      if (isThemeChange(data)) switchTheme(data, props.setIsDark);
      //todo: Other rules
    }
  });

  return (
    <>
      <DisplayContainer>
        <div>{props.processingData()}</div>
      </DisplayContainer>
    </>
  );
};

// --- Move it to separately part --- //
const isThemeChange = (val: string) => {
  return /dark|light/i.test(val) ? true : false;
};
const switchTheme = (val: string, isDarkMode: Setter<boolean>) => {
  if (/dark/i.test(val)) {
    localStorage.setItem("isDarkMode", "true");
    isDarkMode(true);
  } else if (/light/i.test(val)) {
    localStorage.setItem("isDarkMode", "false");
    isDarkMode(false);
  }
};
