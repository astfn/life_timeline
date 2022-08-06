import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
//constants
import { VisualizedTimeModeMapRateCount } from "./constants";
//types
import {
  DayTimeLineStore,
  VisualizedTimeModeEnum,
  TimeUnitEnum,
  FormElements,
} from "./types";

/**
 * 根据当前的可视化时间模式，获取对应的RateCount
 */
export function useGetRateCount() {
  //store
  const { visualizedTimeMode } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      visualizedTimeMode: dayTimeLineStore.visualizedTimeMode,
    };
  }, shallowEqual);
  //state
  const [rateCount, setRateCount] = useState(
    VisualizedTimeModeMapRateCount[visualizedTimeMode]
  );
  //hooks
  useEffect(() => {
    setRateCount(VisualizedTimeModeMapRateCount[visualizedTimeMode]);
  }, [visualizedTimeMode]);

  return rateCount;
}

/**
 * 根据 store 中的耗时数据，计算应被选中的ReteCount
 */
export function useGetRateSelectCount() {
  //store
  const { visualizedTimeMode, formElements } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      visualizedTimeMode: dayTimeLineStore.visualizedTimeMode,
      formElements: dayTimeLineStore.formElements,
    };
  }, shallowEqual);
  //state
  const [rateSelectCount, setRateSelectCount] = useState(0);

  //hooks
  useEffect(() => {
    setRateSelectCount(calculateSelectCount(visualizedTimeMode, formElements));
  }, [formElements, visualizedTimeMode]);

  return rateSelectCount;
}
/**
 * 计算工具
 */
function calculateSelectCount(
  mode: VisualizedTimeModeEnum,
  formElements: FormElements
): number {
  let selectCount = 0;
  mode === VisualizedTimeModeEnum.HOUR &&
    (selectCount = calculateSelectCountByHour(formElements));
  mode === VisualizedTimeModeEnum.MINUTE &&
    (selectCount = calculateSelectCountByMinute(formElements));
  return selectCount;
}

function calculateSelectCountByHour(formElements: FormElements) {
  let selectedCount = 0;
  Object.entries(formElements).forEach(([id, item]) => {
    let currentTime = 0;
    const itemWeight = Number(item.weight);

    item.unit === TimeUnitEnum.HOUR && (currentTime = itemWeight);
    item.unit === TimeUnitEnum.MINUTE &&
      (currentTime = Number((itemWeight / 60).toFixed(1)));

    selectedCount += currentTime;
  });

  return selectedCount;
}

function calculateSelectCountByMinute(formElements: FormElements) {
  let selectedCount = 0;

  Object.entries(formElements).forEach(([id, item]) => {
    let currentTime = 0;
    const itemWeight = Number(item.weight);

    item.unit === TimeUnitEnum.MINUTE && (currentTime = itemWeight);
    item.unit === TimeUnitEnum.HOUR &&
      (currentTime = Math.round(itemWeight * 60));

    selectedCount += currentTime;
  });

  return selectedCount;
}
