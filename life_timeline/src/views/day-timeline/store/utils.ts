import { Encode } from "@/utils";
import {
  FormElement,
  FormElements,
  TimeUnitEnum,
  VisualizedTimeModeEnum,
} from "./types";

/**
 * 计算已选择的 rate 数目的工具
 */
export interface ICalculateSelectCountRes {
  selectedTotalCount: number;
  formIdMapSelectedCount: { [key: string]: number };
}
export function calculateSelectCount(
  mode: VisualizedTimeModeEnum,
  formElements: FormElements
): ICalculateSelectCountRes {
  return mode === VisualizedTimeModeEnum.HOUR
    ? calculateSelectCountByHour(formElements)
    : calculateSelectCountByMinute(formElements);
}

export function calculateSelectCountByHour(
  formElements: FormElements
): ICalculateSelectCountRes {
  let selectedTotalCount = 0;
  const formIdMapSelectedCount: { [key: string]: number } = {};

  Object.entries(formElements).forEach(([id, item]) => {
    let currentTime = 0;
    const itemWeight = Number(item.weight);

    item.unit === TimeUnitEnum.HOUR && (currentTime = itemWeight);
    item.unit === TimeUnitEnum.MINUTE &&
      (currentTime = Number((itemWeight / 60).toFixed(1)));

    formIdMapSelectedCount[id] = currentTime;
    selectedTotalCount += currentTime;
  });

  return { selectedTotalCount, formIdMapSelectedCount };
}

export function calculateSelectCountByMinute(
  formElements: FormElements
): ICalculateSelectCountRes {
  let selectedTotalCount = 0;
  const formIdMapSelectedCount: { [key: string]: number } = {};

  Object.entries(formElements).forEach(([id, item]) => {
    let currentTime = 0;
    const itemWeight = Number(item.weight);

    item.unit === TimeUnitEnum.MINUTE && (currentTime = itemWeight);
    item.unit === TimeUnitEnum.HOUR &&
      (currentTime = Math.round(itemWeight * 60));

    formIdMapSelectedCount[id] = currentTime;
    selectedTotalCount += currentTime;
  });

  return { selectedTotalCount, formIdMapSelectedCount };
}

//将时间转化为分钟计算
export function toMinute(formInfo: FormElement) {
  const weight = Number(formInfo.weight);
  let minute = 0;
  formInfo.unit === TimeUnitEnum.HOUR && (minute = weight * 60);
  formInfo.unit === TimeUnitEnum.MINUTE && (minute = weight);
  return minute;
}

/**
 * 判断时间线是否已存在（根据编码后的名称判断）
 */
export function timeLineIsRepeat(
  name: string,
  formElements: FormElements
): boolean {
  const encodeName = Encode(name);
  return Object.keys(formElements).some((id) => id === encodeName);
}
