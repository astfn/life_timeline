import styled from "styled-components";

export const DayTimelineWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;
  /**
  * 电脑端
  */
  @media screen and (min-width: 801px) {
    flex-direction: row;
    .day-timeline-visualized,
    .day-timeline-form-elems {
      overflow-y: auto;
      height: 100%;
      padding: 0px 8px;
    }

    .day-timeline-visualized {
      flex: 1;
      /* background-color: #eee; */
    }
    .day-timeline-form-elems {
      width: 500px;
      border-right: 1px solid #fff;
      /* background-color: red; */
    }
  }

  /**
  * 手机端
  */
  @media screen and (max-width: 800px) {
    display: block;
    .day-timeline-visualized,
    .day-timeline-form-elems {
      overflow-y: auto;
      width: 100%;
      padding: 8px 0px;
    }
    .day-timeline-visualized {
    }
    .day-timeline-form-elems {
      border-bottom: 1px solid #fff;
    }
  }
`;
