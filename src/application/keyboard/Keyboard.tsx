import { styled } from "solid-styled-components";

// --- Separately Component --- //
const KeyboardContainer = styled.div`
  width: 100%;
  height: 60%;

  /* background-color: lightblue; */
`;

export const Keyboard = () => {
  return (
    <>
      <KeyboardContainer>
        <div>Klawiatura</div>
      </KeyboardContainer>
    </>
  );
};
