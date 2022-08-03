import axios, { AxiosError } from 'axios';

import { IUserRequestSuccess, IUserInfo, IRequestError } from '@/types/types';
import { ITodo, ITodoListResponse, ITodoResponse } from '@/types/todoTypes';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

customAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<IRequestError>) => {
    if (error.response?.status === 400) {
      localStorage.removeItem('token');
      alert('접근 권한이 없습니다. 로그인 화면으로 이동합니다.');
      window.location.href = '/auth';
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

export async function postTodo(todo: ITodo): Promise<ITodoResponse> {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.post<ITodoResponse>('/todos', todo, {
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
