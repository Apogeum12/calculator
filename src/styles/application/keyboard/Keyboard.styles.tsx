import { styled } from "solid-styled-components";

export const KeyboardContainer = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  flex-direction: row;
`;

export const FirstPartKeyBoardContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const FirstMainKeyboard = styled.div`
  width: 100%;
  height: 83.33%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const FirstMainKeyboardButtons = styled.div`
  width: 33.33%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.smallBtnK {
    height: 12%;
  }
`;
export const FirstBottomKeyboard = styled.div`
  width: 100%;
  height: 16.67%;

  display: flex;
  flex-direction: row;
`;
export const FirstBottomKeyboardButtoms = styled.div`
  height: 100%;
  width: 33.33%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.zeroBtnK {
    width: 66.66%;
  }
`;

export const SecondRightKeyBoardContainer = styled.div`
  width: 25%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const SecondRightBottoms = styled.div`
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
export const TestBtn = styled.button`
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
