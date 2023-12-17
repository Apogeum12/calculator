import { Accessor, Setter, Show, createEffect } from "solid-js";
import { getCurrent } from "@tauri-apps/api/window";
import { styled } from "solid-styled-components";
import { AiOutlineCloseCircle } from "solid-icons/ai";
import { VsChromeMinimize } from "solid-icons/vs";

// --- Separately Component --- //
interface DisplayContainerProps {
  desktop: boolean;
}
const DisplayContainer = styled.div<DisplayContainerProps>`
  width: 100%;
  height: 30%;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.desktop ? "center" : "flex-end;")};
  align-items: center;
`;

//? --- App TitleBar --- //
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
  margin-left: 0.3rem;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const ControlerCloseApp = styled.div`
  width: 20px;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  /* Switch between dark mode*/
  color: #407ead;

  &:first-child {
    border-radius: 16px 0 0 0 0;
  }
  #AppClose:hover {
    color: snow;
    font-size: larger;
  }
  #AppMinimize:hover {
    color: snow;
    font-size: larger;
  }
  cursor: pointer;
`;
//? --- End: App TitleBar --- //

// --- Data display --- //
interface DisplayDataProps {
  desktop: boolean;
}
const DisplayDataContainer = styled.div<DisplayDataProps>`
  width: 92%;
  border-radius: 8px;
  height: ${(props) => (props.desktop ? "85%" : "95%")};
  background-color: rgba(139, 181, 253, 0.1);
  filter: drop-shadow(1px 2px 1px rgba(4, 47, 125, 0.1)) invert(10%);
`;
//! TODO: place for a formula processing
//! TODO: place for a data result

interface DisplayProps {
  processingData: Accessor<string>;
  setIsDark: Setter<boolean>;
  desktop: boolean;
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
      <DisplayContainer desktop={props.desktop}>
        <Show when={props.desktop}>
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
        </Show>
        <DisplayDataContainer desktop={props.desktop}>
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
