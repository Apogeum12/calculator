import { Accessor, Setter, createEffect } from "solid-js";
import { getCurrent } from "@tauri-apps/api/window";
import { styled } from "solid-styled-components";
import { AiOutlineCloseCircle } from "solid-icons/ai";
import { VsChromeMinimize } from "solid-icons/vs";

// --- Separately Component --- //
const DisplayContainer = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DisplayControlerContainer = styled.div`
  width: 100%;
  height: 15%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const DisplayControlerButtons = styled.div`
  width: 25%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
//! TODO
const ControlerCloseApp = styled.div`
  width: 45%; /* smobile 25%, mobile: 45%  */
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: x-large;
  /* Switch between dark mode*/
  color: #407ead;

  &:first-child {
    border-radius: 16px 0 0 0 0;
  }
  #AppClose:hover {
    color: snow;
    font-size: xx-large;
  }
  #AppMinimize:hover {
    color: snow;
    font-size: xx-large;
  }
  cursor: pointer;
`;
const DisplayDataContainer = styled.div`
  width: 92%;
  /* TODO! If mobile height 100% */
  height: 85%;
  background-color: rgba(139, 181, 253, 0.1);
  filter: drop-shadow(1px 2px 1px rgba(4, 47, 125, 0.1)) invert(10%);
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
        {/* TODO! If mobile then none */}
        <DisplayControlerContainer data-tauri-drag-region class="titlebar">
          <DisplayControlerButtons>
            <ControlerCloseApp
              onClick={() => getCurrent().close()}
              id="titlebar-close"
            >
              <AiOutlineCloseCircle id="AppClose" />
            </ControlerCloseApp>
            <ControlerCloseApp
              onClick={() => getCurrent().minimize()}
              id="titlebar-minimize"
            >
              <VsChromeMinimize id="AppMinimize" />
            </ControlerCloseApp>
          </DisplayControlerButtons>
        </DisplayControlerContainer>
        <DisplayDataContainer>
          <div>{props.processingData()}</div>
        </DisplayDataContainer>
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
