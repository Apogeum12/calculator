import { Accessor, Setter, Show, createEffect, createSignal } from "solid-js";
import { getCurrent } from "@tauri-apps/api/window";
import { styled } from "solid-styled-components";
import { AiOutlineCloseCircle } from "solid-icons/ai";
import { VsChromeMinimize } from "solid-icons/vs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@suid/material";

import { invoke } from "@tauri-apps/api/primitives";

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
  const [formulaError, setFormulaError] = createSignal<boolean>(false);

  createEffect(async () => {
    if (props.processingData().length > 0) {
      //! TODO try / catch
      let data = props.processingData();
      if (isThemeChange(data)) {
        switchTheme(data, props.setIsDark);
        setResultData("");
        props.setProcessingData("");
        return;
      }
      const isFormulaError = preProcessingFormula(data);
      if (isFormulaError) {
        setFormulaError(true);
        props.setProcessingData("");
        setResultData("");
        return;
      }
      //? change all ',' to '.'
      data = switchToDots(data);

      //? Parse function for Rust calculation
      data = parseFunctionForRust(data);
      let result: string | undefined = await invoke("processing_formula", {
        formula: data,
      });
      if (!result) {
        setFormulaError(true);
        props.setProcessingData("");
        setResultData("");
        return;
      }
      setResultData(result);
    } else {
      setResultData("");
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
              <DisplayResult>{resultData().slice(0, 10)}</DisplayResult>
            </Show>
          </DisplayResultCont>
        </DisplayDataContainer>
      </DisplayContainer>
      <Dialog open={formulaError()}>
        <DialogTitle style={{ "text-align": "center" }}>
          Formula Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Calculator isn't supported sended formula.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormulaError(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
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
const preProcessingFormula = (val: string) => {
  const cleanningRegex = new RegExp(
    /%|√|sin\d+(\.\d+)?|tan\d+(\.\d+)?|\/|\*|[0-9]|-|\+|\.|\,/,
    "gim"
  );
  return val.replace(cleanningRegex, "").length > 0;
};

const parseFunctionForRust = (val: string) => {
  // --- Replace Sin and Tan
  const add_multiply = new RegExp(/(\d+)(sin|tan|√)/, "g");
  const new_val_ = val.replace(add_multiply, "$1*$2");

  const regex_t = new RegExp(/(sin|tan)(\d+(\.\d+)?)/, "g");
  const new_val = new_val_.replace(regex_t, "math::$1($2)");
  // --- Replace Modulo
  const regex_m = new RegExp(/(√)(\d+(\.\d+)?)/, "g");
  return new_val.replace(regex_m, "math::sqrt($2)");
};
