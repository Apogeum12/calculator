import { createEffect, createSignal, onMount } from "solid-js";
// import { invoke } from "@tauri-apps/api/primitives";
import { useMediaQuery } from "@suid/material";
import { getTheme } from "./helpers/function/theme";
import { Display } from "./application/display/Display";
import { SecondDisplay } from "./application/secondDisplay/SecondDisplay";
import { Keyboard } from "./application/keyboard/Keyboard";
import { displaySize } from "./helpers/interface/displaySize";
import { AppContainer, ApplicationBackground } from "./styles/App.styles";

function App() {
  //? --- Get Display Size --- ?//
  const [displaySize, setDisplaySize] = createSignal<displaySize>({
    sMobile: useMediaQuery("(max-width: 380px)")(),
    mobile: useMediaQuery("(min-width: 381px) and (max-width: 460px)")(),
    tablet: useMediaQuery("(min-width: 461px) and (max-width: 1025px)")(),
    laptop: useMediaQuery("(min-width: 1026px) and (max-width: 1700px)")(),
    desktop: useMediaQuery("(min-width: 1701px)")(),
  });
  //? - Get Theme type
  //? - Based on mediaType get themeMaterial and themeStyled
  const [isDark, setIsDark] = createSignal<boolean>(true);
  onMount(() => {
    getTheme(setIsDark);
  });

  createEffect(() => {
    const size: displaySize = {
      sMobile: useMediaQuery("(max-width: 380px)")(),
      mobile: useMediaQuery("(min-width: 381px) and (max-width: 460px)")(),
      tablet: useMediaQuery("(min-width: 461px) and (max-width: 1025px)")(),
      laptop: useMediaQuery("(min-width: 1026px) and (max-width: 1700px)")(),
      desktop: useMediaQuery("(min-width: 1701px)")(),
    };
    setDisplaySize(size);
    getTheme(setIsDark);

    //todo!: remove below
    // console.log("All sizes: ", size);
  });

  return (
    <ApplicationBackground>
      <AppContainer displaySize={displaySize()}>
        <Display />
        <SecondDisplay />
        <Keyboard />
      </AppContainer>
    </ApplicationBackground>
  );
}
export default App;
