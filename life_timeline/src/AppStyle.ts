import styled from "styled-components";

export const AppStyledWrapper = styled.div`
  height: 100%;
  display: flex;
  main {
    padding: 8px;
    overflow-y: auto;
    background-color: aliceblue;
  }

  /**
  * 电脑端
  */
  @media screen and (min-width: 801px) {
    flex-direction: row;
    main {
      flex: 1;
      width: calc(100% - 50px);
    }
  }

  /**
  * 手机端
  */
  @media screen and (max-width: 800px) {
    flex-direction: column;
    main {
      flex: 1;
      height: calc(100% - 45px);
    }
  }
`;
