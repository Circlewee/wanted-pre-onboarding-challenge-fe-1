import axios, { AxiosError } from 'axios';

import { IUserRequestSuccess, IUserInfo, IRequestError } from '@/types/types';
import { IFormType, ITodoListResponse, ITodoResponse } from '@/types/todoTypes';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

customAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<IRequestError>) => {
    const message = error.response?.data.details;
    if (message) {
      alert(message);
      // 적절한 방법은 아니지만 react-router에서 제공하는 커스텀 훅을 사용할 수 없으므로 임시처리함
      if (message === 'Token is missing') {
        window.location.href = '/auth';
      } else {
        window.location.href = '/';
      }

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

export async function deleteTodo(id: string): Promise<string> {
  const token = localStorage.getItem('token');
  await customAxios.delete(`/todos/${id}`, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return id;
}

export default customAxios;
