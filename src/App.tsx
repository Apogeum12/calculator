import { createEffect, createSignal, onMount } from "solid-js";
// import { invoke } from "@tauri-apps/api/primitives";
import { styled } from "solid-styled-components";
import { useMediaQuery } from "@suid/material";
import { getTheme } from "./helpers/function/theme";

const ApplicationBackground = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

interface AppContainerProps {
  displaySize: displaySize;
}
const AppContainer = styled.div<AppContainerProps>`
  /* TODO: from laptop size */
  width: ${(props) => (props.displaySize.tablet ? "80%" : "100%")};
  height: ${(props) => (props.displaySize.tablet ? "80%" : "100%")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// --- Separately Component --- //
const DisplayContainer = styled.div`
  width: 100%;
  height: 30%;

  background-color: aqua;
`;
// --- Separately Component --- //
const SecondDisplayContainer = styled.div`
  width: 100%;
  height: 10%;

  background-color: orange;
`;
// --- Separately Component --- //
const KeyboardContainer = styled.div`
  width: 100%;
  height: 60%;

  background-color: lightblue;
`;

function App() {
  //? --- Get Display Size --- ?//
  const [displaySize, setDisplaySize] = createSignal<displaySize>({
    sMobile: useMediaQuery("(max-width: 380px)")(),
    mobile: useMediaQuery("(min-width: 381px) and (max-width: 460px)")(),
    tablet: useMediaQuery("(min-width: 461px)")(),
  });
  // todo: laptop
  // todo: desktop
  //? - Get Theme type
  //? - Based on mediaType get themeMaterial and themeStyled
  const [isDark, setIsDark] = createSignal<boolean>(true);
  onMount(() => {
    getTheme(setIsDark);
  });

  createEffect(() => {
    const smallMobile = useMediaQuery("(max-width: 380px)");
    const mobile = useMediaQuery("(min-width: 381px) and (max-width: 460px)");
    const tablet = useMediaQuery("(min-width: 461px)");

    const size: displaySize = {
      sMobile: smallMobile(),
      mobile: mobile(),
      tablet: tablet(),
    };
    setDisplaySize(size);
    getTheme(setIsDark);

    console.log("Small Mobile?: ", smallMobile());
    console.log("Mobile?: ", mobile());
    console.log("tablet?: ", tablet());
  });

  return (
    <ApplicationBackground>
      <AppContainer displaySize={displaySize()}>
        <DisplayContainer>
          <div>Ekran</div>
        </DisplayContainer>
        <SecondDisplayContainer>
          <div>Podświetlenie</div>
        </SecondDisplayContainer>
        <KeyboardContainer>
          <div>Klawiatura</div>
        </KeyboardContainer>
      </AppContainer>
    </ApplicationBackground>
  );
}
export default App;

interface displaySize {
  sMobile: boolean;
  mobile: boolean;
  tablet: boolean;
}
