//types
import {
  VisualizedTimeModeEnum,
  DayTimeLineStore,
  FormElements,
  FormElement,
} from "./types";
import ActionTypesEnum from "./actionTypes";
//utils
import { initFormElems } from "./constants";
import { Encode } from "@/utils";
import { cloneDeep } from "lodash";

const dayTimeLineStore: DayTimeLineStore = {
  visualizedTimeMode: VisualizedTimeModeEnum.HOUR,
  formElements: initFormElems(),
};

function dayTimeLineReducer(
  state: DayTimeLineStore = dayTimeLineStore,
  action: any
) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypesEnum.CHANGE_VISUALIZED_TIME_MODE: {
      const { visualizedTimeMode } = payload;
      return { ...state, visualizedTimeMode };
    }
    case ActionTypesEnum.ADD_TIMELINE: {
      const newTimeLine = payload.newTimeLine as FormElement;
      const formElements = state.formElements;
      const newFormElement = { [Encode(newTimeLine.name)]: newTimeLine };
      const newFormElements: FormElements = {
        ...formElements,
        ...newFormElement,
      };
      return { ...state, formElements: newFormElements };
    }
    case ActionTypesEnum.UPDATE_FORM_ITEMS_VALUE: {
      const formItemIdMapNewValue = payload.formItemIdMapNewValue as {
        [id: string]: string;
      };
      const newFormElements: FormElements = cloneDeep(state.formElements);
      Object.entries(newFormElements).forEach(([id, item]) => {
        formItemIdMapNewValue[id] && (item.weight = formItemIdMapNewValue[id]);
      });
      return { ...state, formElements: newFormElements };
    }
    case ActionTypesEnum.COVER_FORM_ITEMS: {
      const formElements = { ...payload.formElements } as FormElements;
      return { ...state, formElements };
    }
    default: {
      return state;
    }
  }
}

export default dayTimeLineReducer;
