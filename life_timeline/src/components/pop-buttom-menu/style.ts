import styled from "styled-components";

export const ASPopButtomMenuWrapper = styled.div`
  .button-trigger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.1s;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);

    .button-trigger-content {
      /* 禁止点击事件 */
      pointer-events: none;
    }
  }
`;
