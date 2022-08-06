//utils
import { Encode } from "@/utils";
//types
import { VisualizedTimeModeEnum, TimeUnitEnum, FormElements } from "./types";

export const VisualizedTimeModeMapRateCount = Object.freeze({
  [VisualizedTimeModeEnum.HOUR]: 24,
  [VisualizedTimeModeEnum.MINUTE]: 24 * 60,
});

export const UnitOptions = Object.freeze({
  [TimeUnitEnum.HOUR]: "小时",
  [TimeUnitEnum.MINUTE]: "分钟",
});

export function initFormElems(): FormElements {
  return {
    [Encode("通勤")]: {
      name: "通勤",
      weight: "30",
      unit: TimeUnitEnum.MINUTE,
    },
    [Encode("工作")]: {
      name: "工作",
      weight: "8",
      unit: TimeUnitEnum.HOUR,
    },
    [Encode("学习")]: {
      name: "学习",
      weight: "3",
      unit: TimeUnitEnum.HOUR,
    },
    [Encode("健身")]: {
      name: "健身",
      weight: "1",
      unit: TimeUnitEnum.HOUR,
    },
    [Encode("睡觉")]: {
      name: "睡觉",
      weight: "8",
      unit: TimeUnitEnum.HOUR,
    },
    [Encode("用餐")]: {
      name: "用餐",
      weight: "1",
      unit: TimeUnitEnum.HOUR,
    },
  };
}
