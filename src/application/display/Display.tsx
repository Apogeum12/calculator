import { styled } from "solid-styled-components";

// --- Separately Component --- //
const DisplayContainer = styled.div`
  width: 100%;
  height: 30%;

  /* background-color: aqua; */
`;

export const Display = () => {
  return (
    <>
      <DisplayContainer>
        <div>Ekran</div>
      </DisplayContainer>
    </>
  );
};
