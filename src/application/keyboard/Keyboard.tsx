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

export const Keyboard = () => {
  return (
    <>
      <KeyboardContainer>
        <FirstPartKeyBoardContainer>
          <FirstMainKeyboard>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn>%</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn>mod</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons class="smallBtnK">
              <TestBtn>sin</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>Ac</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>Bac</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>/</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>7</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>8</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>9</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>4</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>5</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>6</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>1</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>2</TestBtn>
            </FirstMainKeyboardButtons>
            <FirstMainKeyboardButtons>
              <TestBtn>3</TestBtn>
            </FirstMainKeyboardButtons>
          </FirstMainKeyboard>
          <FirstBottomKeyboard>
            <FirstBottomKeyboardButtoms class="zeroBtnK">
              <TestBtn>0</TestBtn>
            </FirstBottomKeyboardButtoms>
            <FirstBottomKeyboardButtoms>
              <TestBtn>.</TestBtn>
            </FirstBottomKeyboardButtoms>
          </FirstBottomKeyboard>
        </FirstPartKeyBoardContainer>
        <SecondRightKeyBoardContainer>
          <SecondRightBottoms class="smallBtnK">
            <TestBtn>tan</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms>
            <TestBtn>*</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms>
            <TestBtn>-</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms class="bigBtnK">
            <TestBtn>+</TestBtn>
          </SecondRightBottoms>
          <SecondRightBottoms class="bigBtnK">
            <TestBtn>=</TestBtn>
          </SecondRightBottoms>
        </SecondRightKeyBoardContainer>
      </KeyboardContainer>
    </>
  );
};
