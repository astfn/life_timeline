export interface DayTimeLineStore {
  visualizedTimeMode: VisualizedTimeModeEnum;
  formElements: FormElements;
}

export interface FormElements {
  [id: string]: FormElement;
}

//可视化的时间模式
export enum VisualizedTimeModeEnum {
  HOUR = "hour",
  MINUTE = "minute",
}

//每个表单元素的时间类型
export enum TimeUnitEnum {
  HOUR = "hour",
  MINUTE = "minute",
}

//每个表单元素的数据结构形式
export interface FormElement {
  name: string;
  weight: string;
  unit: TimeUnitEnum;
}
