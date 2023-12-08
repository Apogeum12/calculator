import { Accessor, Setter } from "solid-js";
import { styled } from "solid-styled-components";

//? todo: move styles
//? Add comments todo
//? todo: add event for all buttons
//? display data from buttons on the Second screen

// --- Separately Component --- //
const KeyboardContainer = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  flex-direction: row;
`;

const FirstPartKeyBoardContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const FirstMainKeyboard = styled.div`
  width: 100%;
  height: 83.33%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FirstMainKeyboardButtons = styled.div`
  width: 33.33%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.smallBtnK {
    height: 12%;
  }
`;
const FirstBottomKeyboard = styled.div`
  width: 100%;
  height: 16.67%;

  display: flex;
  flex-direction: row;
`;
const FirstBottomKeyboardButtoms = styled.div`
  height: 100%;
  width: 33.33%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.zeroBtnK {
    width: 66.66%;
  }
`;

const SecondRightKeyBoardContainer = styled.div`
  width: 25%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SecondRightBottoms = styled.div`
  width: 100%;
  height: 16.8%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.smallBtnK {
    height: 10%;
  }
  &.bigBtnK {
    height: 25.75%;
  }
`;

//! TODO: remove issue with mobile click background //
const TestBtn = styled.button`
  width: 70%;
  height: 80%;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* TODO: Configure */
  background-color: rgba(171, 208, 237, 0.55);
  color: rgb(78, 124, 156);
  border: 2px solid rgba(123, 152, 174, 0.5);
  font-weight: 600;
  font-size: x-large;
  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer;
`;

interface KeyboardProps {
  handleDataPutOnDisplay: (val: string) => void;
  dataPutOnDisplay: Accessor<string>;
  setDataPutOnDisplay: Setter<string>;
}
export const Keyboard = (props: KeyboardProps) => {
  const handleDataPutOnDisplay = props.handleDataPutOnDisplay;
  const removeAll = () => {
    props.setDataPutOnDisplay("");
  };
  const removeLastChar = () => {
    const lenDisplayData = props.dataPutOnDisplay().length;
    props.setDataPutOnDisplay(
      props.dataPutOnDisplay().slice(0, lenDisplayData - 1)
    );
  };

  //! Effect add data from keyboard with sound //
  //! General function handle based on button with "3"

  return (
    <>
      <KeyboardContainer>
        <FirstPartKeyBoardContainer>
          <FirstMainKeyboard>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn onClick={() => handleDataPutOnDisplay("%")}>%</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn onClick={() => handleDataPutOnDisplay("mod")}>
                mod
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn onClick={() => handleDataPutOnDisplay("sin")}>
                sin
              </TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => removeAll()}>AC</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => removeLastChar()}>Bac</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("/")}>/</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("7")}>7</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("8")}>8</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("9")}>9</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("4")}>4</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("5")}>5</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("6")}>6</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("1")}>1</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn onClick={() => handleDataPutOnDisplay("2")}>2</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn
                value="3"
                onClick={(e) => handleDataPutOnDisplay(e.currentTarget.value)}
              >
                3
              </TestBtn>
            </FirstMainKeyboardButtons>
          </FirstMainKeyboard>
          <FirstBottomKeyboard>
            <FirstBottomKeyboardButtoms class="zeroBtnK">
              <TestBtn onClick={() => handleDataPutOnDisplay("0")}>0</TestBtn>
            </FirstBottomKeyboardButtoms>
            <FirstBottomKeyboardButtoms>
              <TestBtn onClick={() => handleDataPutOnDisplay(".")}>.</TestBtn>
            </FirstBottomKeyboardButtoms>
          </FirstBottomKeyboard>
        </FirstPartKeyBoardContainer>
        <SecondRightKeyBoardContainer>
          <SecondRightBottoms class="smallBtnK">
            <TestBtn onClick={() => handleDataPutOnDisplay("tan")}>tan</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms>
            <TestBtn onClick={() => handleDataPutOnDisplay("*")}>*</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms>
            <TestBtn onClick={() => handleDataPutOnDisplay("-")}>-</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms class="bigBtnK">
            <TestBtn onClick={() => handleDataPutOnDisplay("+")}>+</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms class="bigBtnK">
            <TestBtn>=</TestBtn>
          </SecondRightBottoms>
        </SecondRightKeyBoardContainer>
      </KeyboardContainer>
    </>
  );
};
