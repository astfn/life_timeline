import { combineReducers } from "redux";
import dayTimeLineReducer from "@/views/day-timeline/store";

const rootReducer = combineReducers({ dayTimeLineStore: dayTimeLineReducer });

export default rootReducer;
