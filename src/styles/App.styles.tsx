import { styled } from "solid-styled-components";
import { DisplaySize } from "../helpers/interface/displaySize";

interface ApplicationBackgroundProps {
  isDark: boolean;
}
export const ApplicationBackground = styled.div<ApplicationBackgroundProps>`
  width: 100vw;
  height: 100vh;
  /*TODO! If mobile then none */
  border-radius: 16px;

  font-size: 18px;
  font-weight: 400;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* --- Light Theme --- */
  background-image: ${(props) =>
    props.isDark
      ? "linear-gradient(0deg,rgba(36, 72, 96, 0.9) 40%,rgba(0, 145, 255, 0.7) 95%)"
      : "linear-gradient(0deg,rgba(198, 232, 255, 0.92) 40%,rgba(215, 238, 255, 0.98) 100%)"};
`;

interface AppContainerProps {
  displaySize: DisplaySize;
}
export const AppContainer = styled.div<AppContainerProps>`
  width: ${(props) =>
    props.displaySize.laptop
      ? "80%"
      : props.displaySize.desktop
      ? "50%"
      : "100%"};
  height: ${(props) =>
    props.displaySize.laptop
      ? "80%"
      : props.displaySize.desktop
      ? "50%"
      : "100%"};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
