import { Accessor, Setter } from "solid-js";
import {
  BacklightDisplayCont,
  DataDisplayCont,
  SecondDisplayContainer,
} from "../../styles/application/secondDisplay/SecondDisplay.styles";

interface SecondDisplayProps {
  dataPutOnDisplay: Accessor<string>;
  setDataPutOnDisplay: Setter<string>;
  setProcessingData: Setter<string>;
}
export const SecondDisplay = (props: SecondDisplayProps) => {
  // -- Keyboard Listening --- //
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      props.setProcessingData(props.dataPutOnDisplay());
      props.setDataPutOnDisplay("");
    }
  };

  return (
    <>
      <SecondDisplayContainer>
        <BacklightDisplayCont>
          <DataDisplayCont
            onInput={(e) => props.setDataPutOnDisplay(e.target.value)}
            id="SecondDisplay-input-component"
            value={props.dataPutOnDisplay()}
            onKeyDown={handleKeyDown}
          />
        </BacklightDisplayCont>
      </SecondDisplayContainer>
    </>
  );
};
