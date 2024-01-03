import { Accessor, Setter } from "solid-js";
import {
  FirstBottomKeyboard,
  FirstBottomKeyboardButtoms,
  FirstMainKeyboard,
  FirstMainKeyboardButtons,
  FirstPartKeyBoardContainer,
  KeyboardContainer,
  SecondRightBottoms,
  SecondRightKeyBoardContainer,
  TestBtn,
} from "../../styles/application/keyboard/Keyboard.styles";
import { BiRegularArrowBack } from "solid-icons/bi";
import { TbMath } from "solid-icons/tb";

interface KeyboardProps {
  handleDataPutOnDisplay: (val: string) => void;
  dataPutOnDisplay: Accessor<string>;
  setDataPutOnDisplay: Setter<string>;
  setProcessingData: Setter<string>;
}
export const Keyboard = (props: KeyboardProps) => {
  const handleDataPutOnDisplay = props.handleDataPutOnDisplay;

  // --- Remove chars --- //
  const removeAll = () => {
    props.setProcessingData("");
    props.setDataPutOnDisplay("");
  };
  const removeLastChar = () => {
    const lenDisplayData = props.dataPutOnDisplay().length;
    props.setDataPutOnDisplay(
      props.dataPutOnDisplay().slice(0, lenDisplayData - 1)
    );
  };
  // --- End: Remove chars --- //

  // -- Button Enter Listening --- //
  const handleEnter = () => {
    props.setProcessingData(props.dataPutOnDisplay());
    props.setDataPutOnDisplay("");
  };

  const handleInputButton = (e: MouseEvent) => {
    const target = e?.currentTarget as HTMLButtonElement;
    if (target && target.value) {
      handleDataPutOnDisplay(target.value);
    }
    //todo! ---  Add sound when click :) ---
  };

  return (
    <>
      <KeyboardContainer>
        <FirstPartKeyBoardContainer>
          <FirstMainKeyboard>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn value="%" onClick={handleInputButton}>
                %
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn value="√" onClick={handleInputButton}>
                <TbMath />
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn value="sin" onClick={handleInputButton}>
                sin
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => removeAll()}>C</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => removeLastChar()}>
                <BiRegularArrowBack />
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="/" onClick={handleInputButton}>
                /
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="7" onClick={handleInputButton}>
                7
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="8" onClick={handleInputButton}>
                8
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="9" onClick={handleInputButton}>
                9
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="4" onClick={handleInputButton}>
                4
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="5" onClick={handleInputButton}>
                5
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="6" onClick={handleInputButton}>
                6
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="1" onClick={handleInputButton}>
                1
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="2" onClick={handleInputButton}>
                2
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn value="3" onClick={handleInputButton}>
                3
              </TestBtn>
            </FirstMainKeyboardButtons>
          </FirstMainKeyboard>
          <FirstBottomKeyboard>
            <FirstBottomKeyboardButtoms class="zeroBtnK">
              <TestBtn value="0" onClick={handleInputButton}>
                0
              </TestBtn>
            </FirstBottomKeyboardButtoms>
            <FirstBottomKeyboardButtoms>
              <TestBtn value="." onClick={handleInputButton}>
                .
              </TestBtn>
            </FirstBottomKeyboardButtoms>
          </FirstBottomKeyboard>
        </FirstPartKeyBoardContainer>
        <SecondRightKeyBoardContainer>
          <SecondRightBottoms class="smallBtnK">
            <TestBtn value="tan" onClick={handleInputButton}>
              tan
            </TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms>
            <TestBtn value="*" onClick={handleInputButton}>
              *
            </TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms>
            <TestBtn value="-" onClick={handleInputButton}>
              -
            </TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms class="bigBtnK">
            <TestBtn value="+" onClick={handleInputButton}>
              +
            </TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms class="bigBtnK">
            <TestBtn onClick={handleEnter}>=</TestBtn>
          </SecondRightBottoms>
        </SecondRightKeyBoardContainer>
      </KeyboardContainer>
    </>
  );
};
