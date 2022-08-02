export interface ITodo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITodoResponse {
  data: ITodo;
}

export interface ITodoListResponse {
  data: ITodo[];
}
