//components
import { StyledWrapper } from "./style";
import { Rate, Tabs } from "@arco-design/web-react";
//utils
import { memo } from "react";
import {
  useGetRateCount,
  useGetRateSelectCount,
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
  const { visualizedTimeMode } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      visualizedTimeMode: dayTimeLineStore.visualizedTimeMode,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  const handleChangeTab = (currentTabKey: string) => {
    dispatch(
      changeVisualizedTimeModeAction(currentTabKey as VisualizedTimeModeEnum)
    );
  };

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
    return `您还有 ${Number(
      VisualizedTimeModeMapRateCount[visualizedTimeMode] -
        useGetRateSelectCount()
    ).toFixed(1)} 个星星可使用`;
  }
  return (
    <div className="day-timeline-visualized">
      {useUsableRateCountTitle()}
      <StyledWrapper>
        {renderTabs()}
        <Rate
          allowHalf
          readonly
          count={useGetRateCount()}
          value={useGetRateSelectCount()}
        />
      </StyledWrapper>
    </div>
  );
};

export default memo(ASDayTimeLineVisualized);
