import { Accessor, Setter, Show, createEffect, createSignal } from "solid-js";
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
const DisplayFormulaCont = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
const DisplayFormula = styled.div`
  width: 60%;
  height: 100%;
  padding-right: 0.5rem;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;

  overflow: clip;
`;
const DisplayResultCont = styled.div`
  width: 100%;
  height: 40%;

  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;

  /* Depends from display Size */
  font-size: 2.75rem; /* 3.5rem; */
  font-weight: 600;
`;
const DisplayResultChar = styled.div`
  width: auto;
  height: 100%;
  font-variant: small-caps;
`;
const DisplayResult = styled.div`
  width: fit-content;
  height: 100%;
  padding-right: 0.5rem;
  padding-left: 0.25rem;
`;

interface DisplayProps {
  processingData: Accessor<string>;
  setProcessingData: Setter<string>;
  setIsDark: Setter<boolean>;
  desktop: boolean;
}
export const Display = (props: DisplayProps) => {
  const [resultData, setResultData] = createSignal<string>("");

  createEffect(() => {
    if (props.processingData().length > 0) {
      let data = props.processingData();
      if (isThemeChange(data)) {
        switchTheme(data, props.setIsDark);
        setResultData("");
        props.setProcessingData("");
        return;
      }
      //! TODO: detect letter then return error;
      //? change all ',' to '.'
      setResultData(switchToDots(data));
      //! TODO! Compute formula
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
          <DisplayFormulaCont>
            <DisplayFormula>
              <h4>{props.processingData()}</h4>
            </DisplayFormula>
          </DisplayFormulaCont>
          <DisplayResultCont>
            <Show when={!/ /i.test(resultData()) && resultData() !== ""}>
              <DisplayResultChar>=</DisplayResultChar>
              <DisplayResult>{resultData()}</DisplayResult>
            </Show>
          </DisplayResultCont>
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
const switchToDots = (val: string) => {
  return val.replace(/,/gm, ".");
};
