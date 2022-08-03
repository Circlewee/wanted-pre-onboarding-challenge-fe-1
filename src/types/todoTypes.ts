export interface IFormType {
  title: string;
  content: string;
}

export interface ITodo extends IFormType {
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
