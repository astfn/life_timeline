import { memo, useEffect, useState } from "react";
import BaseChartElement from "../base-cahrt/BaseChartElement";
import { PieChartWrapper } from "./style";
import { initPieChartOption } from "./tools";

export interface IPieChartDataSource {
  name: string;
  value: number;
}
export interface IPieChartElementProps {
  dataSource: Array<IPieChartDataSource>;
  className?: string;
  [key: string]: any;
}
const PieChartElement: React.FC<IPieChartElementProps> = (
  props: IPieChartElementProps
) => {
  const { dataSource, className, ...extra } = props;
  const [option, setOption] = useState(() => initPieChartOption());

  useEffect(() => {
    const newOption = initPieChartOption();
    newOption.series[0].data = dataSource;
    setOption(newOption);
  }, [dataSource]);

  return (
    <PieChartWrapper className={className}>
      <BaseChartElement option={option as any} {...extra} />
    </PieChartWrapper>
  );
};

export default memo(PieChartElement);
