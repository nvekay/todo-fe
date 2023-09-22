export enum TaskStatus {
  All = "all",
  Completed = "completed",
  Uncompleted = "uncompleted",
}

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskData {
  count: number;
  tasks: Task[];
}
