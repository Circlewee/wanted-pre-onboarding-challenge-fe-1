import axios, { AxiosError } from 'axios';
import { createBrowserHistory } from 'history';

import { IUserRequestSuccess, IUserInfo, IRequestError } from '@/types/types';
import { IFormType, ITodoListResponse, ITodoResponse } from '@/types/todoTypes';
import useToast from '@/hooks/useToast';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

customAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<IRequestError>) => {
    const toast = useToast();
    const history = createBrowserHistory();
    const message = error.response?.data.details;

    if (message === 'Token is missing') {
      toast.error(message);
      history.push('/auth');
    }
    // TODO: 존재하지 않는 TODO id로 접근 시 빈화면이 출력되는 오류 수정
    if (message === 'todo를 찾는 도중 문제가 생겼습니다') {
      window.location.href = '/';
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
