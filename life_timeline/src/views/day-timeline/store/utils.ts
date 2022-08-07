import { Encode } from "@/utils";
import { FormElement, FormElements, TimeUnitEnum, VisualizedTimeModeEnum } from "./types";

/**
 * 计算已选择的 rate 数目的工具
 */
export function calculateSelectCount(
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

export function calculateSelectCountByHour(formElements: FormElements) {
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

export function calculateSelectCountByMinute(
  formElements: FormElements
): number {
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
