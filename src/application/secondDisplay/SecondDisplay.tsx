import { styled } from "solid-styled-components";

// --- Separately Component --- //
const SecondDisplayContainer = styled.div`
  width: 100%;
  height: 10%;

  /* background-color: orange; */
`;

export const SecondDisplay = () => {
  return (
    <>
      <SecondDisplayContainer>
        <div>Podświetlenie</div>
      </SecondDisplayContainer>
    </>
  );
};
