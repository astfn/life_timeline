import { memo } from "react";
import { ASHeaderWrapper } from "./style";

interface ASHeaderProps {
  left?: Function;
  center?: Function;
  right?: Function;
  style?: Object;
}
const ASHeader: React.FC<ASHeaderProps> = (props) => {
  const { left, center, right, style } = props;
  return (
    <ASHeaderWrapper className="as-header" style={style}>
      <div className="left">{left?.()}</div>
      <div className="center">{center?.()}</div>
      <div className="right">{right?.()}</div>
    </ASHeaderWrapper>
  );
};

export default memo(ASHeader);
