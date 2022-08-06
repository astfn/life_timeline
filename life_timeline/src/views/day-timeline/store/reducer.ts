//types
import { VisualizedTimeModeEnum, DayTimeLineStore } from "./types";
import ActionTypesEnum from "./actionTypes";
//utils
import { initFormElems } from "./constants";

const dayTimeLineStore: DayTimeLineStore = {
  visualizedTimeMode: VisualizedTimeModeEnum.HOUR,
  formElements: initFormElems(),
};

function dayTimeLineReducer(state = dayTimeLineStore, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypesEnum.CHANGE_VISUALIZED_TIME_MODE: {
      const { visualizedTimeMode } = payload;
      return { ...state, visualizedTimeMode };
    }
    default: {
      return state;
    }
  }
}

export default dayTimeLineReducer;
