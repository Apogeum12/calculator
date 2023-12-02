import { createSignal, onMount } from "solid-js";
import logo from "./assets/logo.svg";
// import { invoke } from "@tauri-apps/api/primitives";
// import "./App.css";
import { styled } from "solid-styled-components";

const Test = styled.div`
  background-color: aliceblue;
`;

function App() {
  //TODO!
  //? - Get mediaSize
  //? - Get Theme type
  //? - Based on mediaType get themeMaterial and themeStyled
  //? - Skeleton App components
  const [isDark, setIsDark] = createSignal<boolean>(true);
  onMount(() => {
    const getThemeFromlocalStorage =
      localStorage.getItem("themeType") || "dark";
    if (/dark/i.test(getThemeFromlocalStorage)) {
      setIsDark(true);
    } else setIsDark(false);
  });

  return (
    <div class="container">
      <h1> Test</h1>
    </div>
  );
}

export default App;
