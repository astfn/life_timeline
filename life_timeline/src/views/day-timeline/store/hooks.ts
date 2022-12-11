import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
//constants
import { VisualizedTimeModeMapRateCount } from "./constants";
//types
import { DayTimeLineStore, VisualizedTimeModeEnum } from "./types";
//utils
import { calculateSelectCount } from "./utils";

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
export function useGetRateSelectCount(): number {
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
    setRateSelectCount(
      calculateSelectCount(visualizedTimeMode, formElements).selectedTotalCount
    );
  }, [formElements, visualizedTimeMode]);

  return rateSelectCount;
}

/**
 * 判断时间线是否被占满
 * 按最小的单位去计算(保证准确性)
 */
export function useTimeLineIsFull(): {
  isFull: boolean;
  usableQuantity: number;
  usableQuantityPercent: number;
} {
  //store
  const { formElements } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      formElements: dayTimeLineStore.formElements,
    };
  }, shallowEqual);
  //state
  const [isFull, setIsFull] = useState<boolean>(true);
  const [usableQuantity, setUsableQuantity] = useState<number>(0);
  const [usableQuantityPercent, setUsableQuantityPercent] = useState<number>(0);
  //hooks
  const visualizedTimeMode = VisualizedTimeModeEnum.MINUTE;
  useEffect(() => {
    const allCount = VisualizedTimeModeMapRateCount[visualizedTimeMode];
    const selectCount = calculateSelectCount(
      visualizedTimeMode,
      formElements
    ).selectedTotalCount;
    setIsFull(selectCount >= allCount);
    setUsableQuantity(allCount - selectCount);
    setUsableQuantityPercent(Math.floor((selectCount / allCount) * 100));
  }, [formElements, visualizedTimeMode]);

  return {
    isFull,
    usableQuantity,
    usableQuantityPercent,
  };
}

/**
 * 展示当前的可用时间
 */
export function useShowUsableQuantity() {
  const { usableQuantity } = useTimeLineIsFull();
  const hour = Math.floor(usableQuantity / 60);
  const minute = usableQuantity - hour * 60;
  return { hour, minute };
}

/**
 * 获取各表单元素的 id
 */
export function useGetFormItemKeys(): string[] {
  //store
  const { formElements } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      formElements: dayTimeLineStore.formElements,
    };
  }, shallowEqual);
  //state
  const [formItemKeys, setFormItemKeys] = useState<string[]>([]);

  //hooks
  useEffect(() => {
    setFormItemKeys(Object.keys(formElements));
  }, [formElements]);

  return formItemKeys;
}
