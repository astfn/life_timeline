//components
import { BaseChartWrapper } from "./style";
import * as echarts from "echarts/core";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
//utils
import { useRef, memo, useEffect, useState } from "react";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { debounce } from "lodash";
//types

type ECharts = echarts.ECharts;

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
  | PieSeriesOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export interface IThemeChartsProps {
  option: ECOption;
  [key: string]: any;
}
const BaseChartElement: React.FC<IThemeChartsProps> = (
  props: IThemeChartsProps
) => {
  const { option, ...extra } = props;

  const ThemeChartsBoxRef = useRef<any>();
  const [ChartRef, setChartRef] = useState<ECharts>({} as any);

  //容器加载后，将charts加载到对应dom上
  useEffect(() => {
    const myChart = echarts.init(ThemeChartsBoxRef.current);
    setChartRef(myChart);
  }, [ThemeChartsBoxRef]);

  //根据options，配置charts
  useEffect(() => {
    ChartRef?.setOption?.(option);
  }, [ChartRef, option]);

  window.onresize = debounce(() => {
    ChartRef.resize();
  }, 500);

  return (
    <BaseChartWrapper
      className="theme-charts"
      ref={ThemeChartsBoxRef}
      {...extra}
    />
  );
};

export default memo(BaseChartElement);
