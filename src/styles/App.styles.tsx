import { styled } from "solid-styled-components";
import { displaySize } from "../helpers/interface/displaySize";

//todo! - theme handle
export const ApplicationBackground = styled.div`
  width: 100vw;
  height: 100vh;
  /*TODO: If mobile then none */
  border-radius: 16px;

  font-size: 18px;
  font-weight: 400;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* --- Light Theme --- */
  background-image: linear-gradient(
    0deg,
    rgba(198, 232, 255, 0.92) 40%,
    rgba(215, 238, 255, 0.98) 100%
  );
`;

interface AppContainerProps {
  displaySize: displaySize;
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
