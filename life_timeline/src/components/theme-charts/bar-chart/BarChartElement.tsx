import { memo } from "react";
import BaseChartElement, { ECOption } from "../base-cahrt/BaseChartElement";

export interface BarChartElementProps {
  option: ECOption;
}
const BarChartElement: React.FC<BarChartElementProps> = (
  props: BarChartElementProps
) => {
  return <BaseChartElement option={props.option} />;
};

export default memo(BarChartElement);
