import styled from "styled-components";

export const StyledWrapper = styled.div`
  /* background-color: orange; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    width: 100%;
    flex: 1;
  }
  footer {
    display: flex;
    justify-content: end;
  }
`;
