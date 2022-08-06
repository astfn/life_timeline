import styled from "styled-components";

export const ASHeaderWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  width: ${(props: any) => `${props?.width}`};
  height: ${(props: any) => `${props?.height || "100%"}`};

  .left,
  .right,
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left,
  .right {
    width: 40px;
    height: 100%;
  }
  .center {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 801px) {
    flex-direction: column;
    .left,
    .right {
      width: 100%;
      height: 40px;
    }
  }
`;
