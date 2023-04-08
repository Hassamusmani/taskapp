import { TasksResponseData } from "./taskTypes";

export interface TaskState {
  getTasksLoading: boolean,
  tasks: TasksResponseData[],
  addTaskLoading: boolean,
  editTaskLoading: boolean,
  deleteTaskLoading: boolean,
  taskAdded: boolean,
  taskEdited: boolean,
  taskDeleted: boolean,
}

export interface GlobalResponse {
  message: string;
  status: boolean;
}