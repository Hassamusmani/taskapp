import { TasksResponseData } from "./taskTypes";

export interface AddTaskRequest {
  task: TasksResponseData;
}

export interface EditTaskRequest {
  task: TasksResponseData;
}

export interface DeleteTaskRequest {
  id: number;
}