import styled from "styled-components";

export const StyledWrapper = styled.div`
  /* background-color: orange; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    padding: 8px 0px;
  }
  main {
    width: 100%;
    flex: 1;

    .space {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .form-item {
        display: flex;
      }
    }
    .edit-top-bar {
      height: 0px;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transform: scale(0);
      transition: 0.3s;
      &.show {
        height: auto;
        transform: scale(1);
      }
      .btn-group {
        display: flex;
      }
    }
  }
  footer {
    display: flex;
    justify-content: end;
  }
`;
