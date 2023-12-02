/* @refresh reload */
import { render } from "solid-js/web";
import "./styles/globalStyle.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
