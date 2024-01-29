import { Accessor, Setter, Show, createEffect, createSignal } from "solid-js";
import { getCurrent } from "@tauri-apps/api/window";
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
import { invoke } from "@tauri-apps/api/core";
import {
  ControlerCloseApp,
  DisplayContainer,
  DisplayControlerButtons,
  DisplayControlerContainer,
  DisplayDataContainer,
  DisplayFormula,
  DisplayFormulaCont,
  DisplayResult,
  DisplayResultChar,
  DisplayResultCont,
} from "../../styles/application/display/Display.styles";
import {
  isThemeChange,
  parseFunctionForRust,
  preProcessingFormula,
  switchTheme,
  switchToDots,
} from "../../helpers/function/display";

interface DisplayProps {
  processingData: Accessor<string>;
  setProcessingData: Setter<string>;
  setDataPutOnDisplay: Setter<string>;
  setIsDark: Setter<boolean>;
  desktop: boolean;
}
export const Display = (props: DisplayProps) => {
  const [resultData, setResultData] = createSignal<string>("");
  const [formulaError, setFormulaError] = createSignal<boolean>(false);

  // TODO! Error msg handler to Dialog ---

  createEffect(async () => {
    try {
      const getDisplay = document.querySelector("#DisplayDataCont");
      if (getDisplay) {
        if (resultData().length > 0) {
          getDisplay.classList.add("copyResultToFormula");
        } else getDisplay.classList.remove("copyResultToFormula");
      }
    } catch (err) {
      setFormulaError(true);
    }

    try {
      let data = props.processingData();

      // --- Detect Empty formula ---
      if (data.length < 1) {
        throw new Error("");
      }
      // --- Detect Theme changing ---
      if (isThemeChange(data)) {
        switchTheme(data, props.setIsDark);
        throw new Error("");
      }
      // --- Detect properly formula ---
      if (preProcessingFormula(data)) {
        setFormulaError(true);
        throw new Error("");
      }
      // --- Detect ',' and change to dot '.' ---
      data = switchToDots(data);

      // --- Parse Formlula for RUST ---
      data = parseFunctionForRust(data);

      // --- RUST computation of formula ---
      let result: string | undefined = await invoke("processing_formula", {
        formula: data,
      });
      if (!result) {
        setFormulaError(true);
        throw new Error("");
      }
      setResultData(result);
    } catch (_) {
      props.setProcessingData("");
      setResultData("");
      return;
    }
  });

  const handleTouchResultCont = () => {
    if (resultData().length > 0 && resultData() !== "0") {
      props.setDataPutOnDisplay(resultData().slice(0, 10));
    }
  };

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
        <DisplayDataContainer
          desktop={props.desktop}
          class="ResultContainer"
          onClick={handleTouchResultCont}
          id="DisplayDataCont"
        >
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
