import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TaskState } from '../types/globalTypes';
import { TasksResponseData } from '../types/taskTypes';
import { AddTaskRequest, EditTaskRequest, DeleteTaskRequest } from '../types/requestBodies';

export const initialState: TaskState = {
  getTasksLoading: false,
  tasks: [],
  addTaskLoading: false,
  editTaskLoading: false,
  deleteTaskLoading: false,
  taskAdded: false,
  taskEdited: false,
  taskDeleted: false,
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks: (state) => {
      state.getTasksLoading = true;
    },
    setTasks: (state, action: PayloadAction<TasksResponseData[]>) => {
      const { payload } = action;
      state.getTasksLoading = false;
      state.tasks = payload;
    },
    getTasksFailed: (state) => {
      state.getTasksLoading = false;
    },
    addTask: (state, action: PayloadAction<AddTaskRequest>) => {
      state.addTaskLoading = true;
    },
    taskAdded: (state, action: PayloadAction<TasksResponseData>) => {
      const { payload } = action;
      state.addTaskLoading = false;
      state.taskAdded = true;
      state.tasks = [payload, ...state.tasks];
    },
    addTaskFailed: (state) => {
      state.addTaskLoading = false;
    },
    resetTaskAdded: (state) => {
      state.taskAdded = false;
    },
    editTask: (state, action: PayloadAction<EditTaskRequest>) => {
      state.editTaskLoading = true;
    },
    taskEdited: (state, action: PayloadAction<TasksResponseData>) => {
      const { payload } = action;
      state.editTaskLoading = false;
      state.taskEdited = true;
      state.tasks = state.tasks.map(task => task.id === payload.id ? payload : task);
    },
    editTaskFailed: (state) => {
      state.editTaskLoading = false;
    },
    resetTaskEdited: (state) => {
      state.taskEdited = false;
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskRequest>) => {
      state.deleteTaskLoading = true;
    },
    taskDeleted: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.deleteTaskLoading = false;
      state.taskEdited = true;
      const taskIndex = state.tasks.findIndex(task => task.id === payload);
      if (taskIndex !== -1) {
        state.tasks.splice(taskIndex, 1);
      }
    },
    deleteTaskFailed: (state) => {
      state.deleteTaskLoading = false;
    },
    resetTaskDeleted: (state) => {
      state.taskDeleted = false;
    },
    reset: () => initialState,
  },
});

export const { actions, reducer, name: sliceKey } = TasksSlice;