import { createEffect, createSignal } from "solid-js";
// import { invoke } from "@tauri-apps/api/primitives";
import { useMediaQuery } from "@suid/material";
import { getTheme } from "./helpers/function/theme";
import { Display } from "./application/display/Display";
import { SecondDisplay } from "./application/secondDisplay/SecondDisplay";
import { Keyboard } from "./application/keyboard/Keyboard";
import { DisplaySize } from "./helpers/interface/displaySize";
import { AppContainer, ApplicationBackground } from "./styles/App.styles";

function App() {
  // --- Get Display Size --- //
  const [displaySize, setDisplaySize] = createSignal<DisplaySize>({
    sMobile: useMediaQuery("(max-width: 380px)")(),
    mobile: useMediaQuery("(min-width: 381px) and (max-width: 460px)")(),
    tablet: useMediaQuery("(min-width: 461px) and (max-width: 1025px)")(),
    laptop: useMediaQuery("(min-width: 1026px) and (max-width: 1700px)")(),
    desktop: useMediaQuery("(min-width: 1701px)")(),
  });
  // --- Get Theme ---
  const [isDark, setIsDark] = createSignal<boolean>(getTheme());

  createEffect(() => {
    const size: DisplaySize = {
      sMobile: useMediaQuery("(max-width: 380px)")(),
      mobile: useMediaQuery("(min-width: 381px) and (max-width: 460px)")(),
      tablet: useMediaQuery("(min-width: 461px) and (max-width: 1025px)")(),
      laptop: useMediaQuery("(min-width: 1026px) and (max-width: 1700px)")(),
      desktop: useMediaQuery("(min-width: 1701px)")(),
    };
    setDisplaySize(size);
  });

  //? --- Put data on display --- //
  const [dataPutOnDisplay, setDataPutOnDisplay] = createSignal<string>("");
  const handleDataPutOnDisplay = (val: string) => {
    const newData = `${dataPutOnDisplay()}${val}`;
    setDataPutOnDisplay(newData);
  };

  // Display handler //
  const [processingData, setProcessingData] = createSignal<string>("");
  // console.log("Is dark Mode? ", isDark());

  return (
    <ApplicationBackground isDark={isDark()}>
      <AppContainer displaySize={displaySize()}>
        <Display processingData={processingData} setIsDark={setIsDark} />
        <SecondDisplay
          dataPutOnDisplay={dataPutOnDisplay}
          setDataPutOnDisplay={setDataPutOnDisplay}
          setProcessingData={setProcessingData}
        />
        <Keyboard
          handleDataPutOnDisplay={handleDataPutOnDisplay}
          dataPutOnDisplay={dataPutOnDisplay}
          setDataPutOnDisplay={setDataPutOnDisplay}
          setProcessingData={setProcessingData}
        />
      </AppContainer>
    </ApplicationBackground>
  );
}
export default App;
