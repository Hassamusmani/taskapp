import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import { reducer as TasksReducer } from "../slice/taskSlice";
import { tasksSaga } from "../saga/tasksSaga";

const rootReducer = combineReducers({
  tasks: TasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function* rootSaga() {
  yield all([tasksSaga()]);
}

export { rootSaga };

export default rootReducer;