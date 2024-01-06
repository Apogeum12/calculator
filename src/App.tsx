import { createEffect, createSignal, onMount } from "solid-js";
import { useMediaQuery } from "@suid/material";
import { getTheme } from "./helpers/function/theme";
import { Display } from "./application/display/Display";
import { SecondDisplay } from "./application/secondDisplay/SecondDisplay";
import { Keyboard } from "./application/keyboard/Keyboard";
import { DisplaySize } from "./helpers/interface/displaySize";
import { AppContainer, ApplicationBackground } from "./styles/App.styles";
import { isDesktop } from "./helpers/function/systemInfo";

//TODO!
// 1) Add sound and transition when click on button
// 2) Styling Keyboard to beta version
// 3) Styling displays to beta version

function App() {
  // --- Get Display Size --- //
  const [displaySize, setDisplaySize] = createSignal<DisplaySize>({
    sMobile: useMediaQuery("(max-width: 380px)")(),
    mobile: useMediaQuery("(min-width: 381px) and (max-width: 460px)")(),
    tablet: useMediaQuery("(min-width: 461px) and (max-width: 1025px)")(),
    laptop: useMediaQuery("(min-width: 1026px) and (max-width: 1700px)")(),
    desktop: useMediaQuery("(min-width: 1701px)")(),
  });
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
  // ------------------------ //

  // --- Detect Desktop --- //
  const [desktop, setDesktop] = createSignal<boolean>(false);
  onMount(async () => {
    setDesktop(await isDesktop());
  });
  // ------------------------ //

  // --- Get Theme ---
  const [isDark, setIsDark] = createSignal<boolean>(getTheme());
  // ------------------------ //

  //? --- Put data on display --- //
  const [dataPutOnDisplay, setDataPutOnDisplay] = createSignal<string>("");
  const handleDataPutOnDisplay = (val: string) => {
    const newData = `${dataPutOnDisplay()}${val}`;
    setDataPutOnDisplay(newData);
  };

  // Display handler //
  const [processingData, setProcessingData] = createSignal<string>("");

  return (
    <ApplicationBackground isDark={isDark()} desktop={desktop()}>
      <AppContainer displaySize={displaySize()}>
        <Display
          processingData={processingData}
          setProcessingData={setProcessingData}
          setIsDark={setIsDark}
          desktop={desktop()}
        />
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
