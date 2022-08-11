export interface TodoInput {
  title: string;
  content: string;
}

export interface TodoData extends TodoInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoResponse {
  data: TodoData;
}

export interface TodoListResponse {
  data: TodoData[];
}
