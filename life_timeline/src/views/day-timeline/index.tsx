//components
import { DayTimelineWrapper } from "./style";
import ASDayTimeLineFormElems from "./components/TimeLineFormElems/TimeLineFormElems";
import ASDayTimeLineVisualized from "./components/TimeLineVisualized/TimeLineVisualized";
//utils
import { memo } from "react";

const ASDayTimeline: React.FC = (props) => {
  return (
    <DayTimelineWrapper>
      <ASDayTimeLineFormElems />
      <ASDayTimeLineVisualized />
    </DayTimelineWrapper>
  );
};

export default memo(ASDayTimeline);
