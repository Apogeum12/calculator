import { styled } from "solid-styled-components";

interface DisplayContainerProps {
  desktop: boolean;
}
export const DisplayContainer = styled.div<DisplayContainerProps>`
  width: 100%;
  height: 30%;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.desktop ? "center" : "flex-end;")};
  align-items: center;
`;

//? --- App TitleBar --- //
export const DisplayControlerContainer = styled.div`
  width: 100%;
  height: 15%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const DisplayControlerButtons = styled.div`
  width: 25%;
  height: 100%;
  margin-left: 0.3rem;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const ControlerCloseApp = styled.div`
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
export const DisplayDataContainer = styled.div<DisplayDataProps>`
  width: 92%;
  border-radius: 8px;
  height: ${(props) => (props.desktop ? "85%" : "95%")};
  background-color: rgba(139, 181, 253, 0.1);
  filter: drop-shadow(1px 2px 1px rgba(4, 47, 125, 0.1)) invert(10%);

  &.copyResultToFormula {
    &:hover {
      background-color: rgba(194, 193, 192, 0.25);
    }
    &:active {
      background-color: rgba(167, 167, 167, 0.45);
    }
    cursor: pointer;
  }
`;
export const DisplayFormulaCont = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
export const DisplayFormula = styled.div`
  width: 60%;
  height: 100%;
  padding-right: 0.5rem;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;

  overflow: clip;
`;
export const DisplayResultCont = styled.div`
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
export const DisplayResultChar = styled.div`
  width: auto;
  height: 100%;
  font-variant: small-caps;
`;
export const DisplayResult = styled.div`
  width: fit-content;
  height: 100%;
  padding-right: 0.5rem;
  padding-left: 0.25rem;
`;
