import axios, { AxiosError } from 'axios';

import { IUserRequestSuccess, IUserInfo, IRequestError } from '@/types/types';
import { IFormType, ITodoListResponse, ITodoResponse } from '@/types/todoTypes';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

customAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<IRequestError>) => {
    if (error.response?.status === 400) {
      alert(error.response.data.details);
      // token 걸러내기 필요
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export async function loginRequest(userInfo: IUserInfo): Promise<IUserRequestSuccess> {
  const { data } = await customAxios.post<IUserRequestSuccess>('/users/login', userInfo);

  return data;
}

export async function registerRequest(userInfo: IUserInfo): Promise<IUserRequestSuccess> {
  const { data } = await customAxios.post<IUserRequestSuccess>('/users/create', userInfo);

  return data;
}

export async function getTodoList(): Promise<ITodoListResponse> {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.get<ITodoListResponse>('/todos', {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
}

export async function getTodoById(id: string | undefined): Promise<ITodoResponse> {
  if (!id) {
    throw new Error('존재하지 않는 Todo입니다.');
  }

  const token = localStorage.getItem('token');
  const { data } = await customAxios.get<ITodoResponse>(`/todos/${id}`, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
}

export async function postTodo(todo: IFormType): Promise<ITodoResponse> {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.post<ITodoResponse>('/todos', todo, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
}

export async function updateTodo({
  id,
  todo,
}: {
  id: string;
  todo: IFormType;
}): Promise<ITodoResponse> {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.put<ITodoResponse>(`/todos/${id}`, todo, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
}

export async function deleteTodo(id: string) {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.delete(`/todos/${id}`, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
}

export default customAxios;
