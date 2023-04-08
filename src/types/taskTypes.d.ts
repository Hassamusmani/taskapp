export interface TasksResponseData {
  id?: number;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  category: string;
  isActive: boolean;
}

export interface taskCategory {
  id: number;
  name: string;
}