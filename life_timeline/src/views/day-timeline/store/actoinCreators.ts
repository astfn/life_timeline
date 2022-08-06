import { Dispatch } from "redux";
import { ThunkFuncAsAnyAction } from "@/utils";
//types
import ActionTypesEnum from "./actionTypes";
import { VisualizedTimeModeEnum } from "./types";

export const changeVisualizedTimeMode = (
  visualizedTimeMode: VisualizedTimeModeEnum
) => {
  return {
    type: ActionTypesEnum.CHANGE_VISUALIZED_TIME_MODE,
    payload: {
      visualizedTimeMode,
    },
  };
};

export function add_thunk() {
  return ThunkFuncAsAnyAction((dispatch: Dispatch, getState: Function) => {
    dispatch({
      type: "increment",
      num: 2,
    });
    console.log(getState().dayTimeLineStore);
  });
}
