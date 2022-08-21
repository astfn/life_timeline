import { Dispatch } from "redux";
import { ThunkFuncAsAnyAction } from "@/utils";
import { Message } from "@arco-design/web-react";

//types
import ActionTypesEnum from "./actionTypes";
import { VisualizedTimeModeEnum, FormElement, FormElements } from "./types";
import { calculateSelectCountByMinute } from "./utils";
import { VisualizedTimeModeMapRateCount } from "./constants";
import { cloneDeep } from "lodash";

export const changeVisualizedTimeModeAction = (
  visualizedTimeMode: VisualizedTimeModeEnum
) => {
  return {
    type: ActionTypesEnum.CHANGE_VISUALIZED_TIME_MODE,
    payload: {
      visualizedTimeMode,
    },
  };
};

export const addTimeLineAction = (newTimeLine: FormElement) => {
  return {
    type: ActionTypesEnum.ADD_TIMELINE,
    payload: {
      newTimeLine,
    },
  };
};

export const updateFormItemsValue = (formItemIdMapNewValue: {
  [id: string]: string;
}) => {
  return {
    type: ActionTypesEnum.UPDATE_FORM_ITEMS_VALUE,
    payload: {
      formItemIdMapNewValue,
    },
  };
};

export const coverFormItems = (formElements: FormElements) => {
  return {
    type: ActionTypesEnum.COVER_FORM_ITEMS,
    payload: {
      formElements,
    },
  };
};

/**
 * thunks
 */
export function updateFormItemsValue_Thunk({
  formItemIdMapNewValue,
  formElements,
}: {
  formItemIdMapNewValue: {
    [id: string]: string;
  };
  formElements: FormElements;
}) {
  return ThunkFuncAsAnyAction((dispatch: Dispatch, getState: Function) => {
    /**
     * 计算更新后的时间，是否超出阈值，来派遣不同的action
     */
    const tempFormElements = cloneDeep(formElements);
    Object.entries(tempFormElements).forEach(([id, item]) => {
      formItemIdMapNewValue[id] && (item.weight = formItemIdMapNewValue[id]);
    });

    const selectCountByMinute = calculateSelectCountByMinute(tempFormElements);
    const isRealUpdate =
      VisualizedTimeModeMapRateCount[VisualizedTimeModeEnum.MINUTE] -
        selectCountByMinute >=
      0;

    dispatch(coverFormItems(isRealUpdate ? tempFormElements : formElements));

    //消息提示
    !isRealUpdate &&
      Message.error({ content: `您所分配的时间已超过阈值，请合理分配！` });
  });
}
