import { GlobalResponse } from "./globalTypes";
import { TasksResponseData } from "./taskTypes";

export interface GetTasksResponse extends GlobalResponse {
  response: GetTasksResponseData;
}

export interface GetTasksResponseData {
  tasks: TasksResponseData[];
}

export interface AddTaskResponse extends GlobalResponse {
  response: AddTasksResponseData;
}

export interface AddTasksResponseData {
  id: number;
}

export interface EditTasksResponse extends GlobalResponse {
  response: {};
}

export interface DeleteTasksResponse extends GlobalResponse {
  response: {};
}