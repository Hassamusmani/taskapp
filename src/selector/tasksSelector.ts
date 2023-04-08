import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/stateTypes';
import { initialState } from '../slice/taskSlice';

const selectDomain = (state: RootState) => state?.tasks || initialState;

export const selectGetTasksLoading = createSelector(
  [selectDomain],
  (state) => state.getTasksLoading,
);

export const selectTasks = createSelector(
  [selectDomain],
  (state) => state.tasks,
);

export const selectAddTaskLoading = createSelector(
  [selectDomain],
  (state) => state.addTaskLoading,
);

export const selectEditTaskLoading = createSelector(
  [selectDomain],
  (state) => state.editTaskLoading,
);

export const selectDeleteTaskLoading = createSelector(
  [selectDomain],
  (state) => state.deleteTaskLoading,
);

export const selectTaskAdded = createSelector(
  [selectDomain],
  (state) => state.taskAdded,
);

export const selectTaskEdited = createSelector(
  [selectDomain],
  (state) => state.taskEdited,
);

export const selectTaskDeleted = createSelector(
  [selectDomain],
  (state) => state.taskDeleted,
);