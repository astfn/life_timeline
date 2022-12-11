import styled from "styled-components";

export const StyledWrapper = styled.div`
  &,
  main {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    display: flex;
    flex-flow: column;
  }

  .visualized-header {
    margin: 8px;
    height: 45px;
    padding: 5px 0px;
    border-radius: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  main {
    & > :nth-child(n + 2) {
      margin-top: 12px;
    }
    .arco-rate-inner {
      flex-wrap: wrap;
    }
    .visualized-rate {
      max-height: 50%;
      overflow-y: auto;
    }
    .pie-chart-wrapper {
      flex: 1;
      height: 50%;
    }
  }
`;
