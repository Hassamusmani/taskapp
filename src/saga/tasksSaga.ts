import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put } from 'redux-saga/effects';
import { actions } from '../slice/taskSlice';
import { AddTaskResponse, EditTasksResponse, GetTasksResponse, DeleteTasksResponse } from '../types/responseBodies';
import { ADD_TASK, DELETE_TASK, EDIT_TASK, GET_TASKS } from '../utils/constants';
import { AddTaskRequest, DeleteTaskRequest, EditTaskRequest } from '../types/requestBodies';
import instance from '../utils/axios';

export function* getTasks() {
  try {
    const response: GetTasksResponse = yield instance.get(GET_TASKS);
    if(response?.status === true) {
      const { tasks } = response?.response;
      yield put(actions.setTasks(tasks || []));
    } else {
      yield put(actions.getTasksFailed());
    }
  } catch (err) {
    console.log(err);
    yield put(actions.getTasksFailed());
  }
}

export function* addTask(dispatched: PayloadAction<AddTaskRequest>) {
  const { payload } = dispatched;
  try {
    const response: AddTaskResponse = yield instance.get(ADD_TASK);
    if (response?.status === true) {
      yield put(actions.taskAdded(payload.task));
      alert(response.message);
    } else {
      yield put(actions.addTaskFailed());
    }
  } catch (err) {
    console.log(err);
    yield put(actions.addTaskFailed());
  }
}

export function* editTask(dispatched: PayloadAction<EditTaskRequest>) {
  const { payload } = dispatched;
  try {
    const response: EditTasksResponse = yield instance.get(EDIT_TASK);
    if (response?.status === true) {
      yield put(actions.taskEdited(payload.task));
      alert(response.message);
    } else {
      yield put(actions.editTaskFailed());
    }
  } catch (err) {
    console.log(err);
    yield put(actions.editTaskFailed());
  }
}

export function* deleteTask(dispatched: PayloadAction<DeleteTaskRequest>) {
  const { payload } = dispatched;
  try {
    const response: DeleteTasksResponse = yield instance.get(DELETE_TASK);
    if (response?.status === true) {
      yield put(actions.taskDeleted(payload.id));
      alert(response.message);
    } else {
      yield put(actions.deleteTaskFailed());
    }
  } catch (err) {
    console.log(err);
    yield put(actions.deleteTaskFailed());
  }
}
export function* tasksSaga() {
  yield takeLatest(actions.getTasks.type, getTasks);
  yield takeLatest(actions.addTask.type, addTask);
  yield takeLatest(actions.editTask.type, editTask);
  yield takeLatest(actions.deleteTask.type, deleteTask);
}
