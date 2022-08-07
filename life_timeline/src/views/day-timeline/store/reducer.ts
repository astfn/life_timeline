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
    default: {
      return state;
    }
  }
}

export default dayTimeLineReducer;
