import styled from "styled-components";

export const TopBannerWrapper = styled.div`
  z-index: 99;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 801px) {
    width: 50px;
    height: 100%;
  }

  /**
  * 手机端
  */
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 45px;
  }
`;
