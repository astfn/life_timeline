import { IPieChartDataSource } from ".";

export const initPieChartOption = () => {
  return {
    title: {
      text: "Pie Chart",
      subtext: "您一天的分配时间比重如图所示",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
};

const defaultAlias = { name: "name", value: "value" };
export function parseObjectToPieChartData({
  source,
  alias,
}: {
  source: { [key: string]: any };
  alias?: { name?: string; value?: string };
}): IPieChartDataSource {
  const RealAlias = { ...defaultAlias, ...alias };
  const { name, value } = RealAlias;
  return {
    name: source[name],
    value: source[value],
  };
}
