//components
import { StyledWrapper } from "./style";
import {
  PageHeader,
  Progress,
  Rate,
  Tabs,
  Tooltip,
} from "@arco-design/web-react";
//utils
import { memo, useEffect, useState } from "react";
import {
  useGetRateCount,
  useGetRateSelectCount,
  useTimeLineIsFull,
} from "@/views/day-timeline/store/hooks";
//types
import {
  VisualizedTimeModeEnum,
  DayTimeLineStore,
} from "@/views/day-timeline/store/types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
//store
import { changeVisualizedTimeModeAction } from "@/views/day-timeline/store/actoinCreators";
import { VisualizedTimeModeMapRateCount } from "@/views/day-timeline/store/constants";
import PieChartElement, {
  IPieChartDataSource,
} from "@/components/theme-charts/pie-chart/PieChartElement";
import { parseObjectToPieChartData } from "@/components/theme-charts/pie-chart/tools";
import { calculateSelectCount } from "../../store/utils";
import { cloneDeep } from "lodash";

const TabPane = Tabs.TabPane;

interface ITab {
  title: string;
  key: string;
}

const tabs: ITab[] = [
  {
    title: "小时",
    key: VisualizedTimeModeEnum.HOUR,
  },
  {
    title: "分钟",
    key: VisualizedTimeModeEnum.MINUTE,
  },
];

/**
 * 组件
 */
const ASDayTimeLineVisualized: React.FC = () => {
  //store
  const { visualizedTimeMode, formElements } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      visualizedTimeMode: dayTimeLineStore.visualizedTimeMode,
      formElements: dayTimeLineStore.formElements,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  const handleChangeTab = (currentTabKey: string) => {
    dispatch(
      changeVisualizedTimeModeAction(currentTabKey as VisualizedTimeModeEnum)
    );
  };

  const { usableQuantityPercent } = useTimeLineIsFull();
  const [pieChartDataSource, setPieChartDataSource] = useState<
    Array<IPieChartDataSource>
  >([]);

  useEffect(() => {
    const alias = { value: "weight" };
    const { formIdMapSelectedCount } = calculateSelectCount(
      visualizedTimeMode,
      formElements
    );
    const formElementsTemp = cloneDeep(formElements);
    setPieChartDataSource(
      Object.entries(formElementsTemp).map(([id, itemData]) => {
        itemData.weight = String(formIdMapSelectedCount[id]);
        return parseObjectToPieChartData({ source: itemData, alias });
      })
    );
  }, [formElements, visualizedTimeMode]);

  /**
   * renders
   */
  function renderTabs() {
    return (
      <Tabs
        type="rounded"
        activeTab={visualizedTimeMode}
        onChange={handleChangeTab}
      >
        {tabs.map((tab) => (
          <TabPane key={tab.key} title={tab.title} />
        ))}
      </Tabs>
    );
  }

  function useUsableRateCountTitle() {
    const count = Number(
      Number(
        VisualizedTimeModeMapRateCount[visualizedTimeMode] -
          useGetRateSelectCount()
      ).toFixed(1)
    );
    const showCount = count === Math.round(count) ? Math.round(count) : count;
    return `您还有 ${showCount} 个星星可使用`;
  }

  return (
    <div className="day-timeline-visualized">
      <StyledWrapper>
        <PageHeader
          className="visualized-header"
          title={
            <Tooltip
              position="bl"
              trigger="hover"
              content={useUsableRateCountTitle()}
            >
              <span className="pointer">{useUsableRateCountTitle()}</span>
            </Tooltip>
          }
          subTitle={renderTabs()}
        />
        <main>
          <Progress
            percent={usableQuantityPercent}
            style={{ padding: "0px 15px" }}
          />
          <Rate
            className="visualized-rate"
            allowHalf
            readonly
            count={useGetRateCount()}
            value={useGetRateSelectCount()}
          />
          <PieChartElement
            className="pie-chart-wrapper"
            dataSource={pieChartDataSource}
          />
        </main>
      </StyledWrapper>
    </div>
  );
};

export default memo(ASDayTimeLineVisualized);
