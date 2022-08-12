import axios, { AxiosError } from 'axios';
import { createBrowserHistory } from 'history';

import { AuthResponse, AuthData, ErrorResponse } from '@/types/authTypes';
import { TodoInput, TodoListResponse, TodoResponse } from '@/types/todoTypes';
import useToast from '@/hooks/useToast';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

customAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const toast = useToast();
    const history = createBrowserHistory();
    const message = error.response?.data.details;

    if (message === 'Token is missing') {
      toast.error(message);
      history.push('/auth/signin');
    }
    // TODO: 존재하지 않는 TODO id로 접근 시 빈화면이 출력되는 오류 수정
    if (message === 'todo를 찾는 도중 문제가 생겼습니다') {
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export const authRequest = (endPoint: string) => {
  return async (userInfo: AuthData): Promise<AuthResponse> => {
    const { data } = await customAxios.post<AuthResponse>(endPoint, userInfo);

    return data;
  };
};

export const getTodoList = async (): Promise<TodoListResponse> => {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.get<TodoListResponse>('/todos', {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
};

export const getTodoById = async (id: string | undefined): Promise<TodoResponse> => {
  if (!id) {
    throw new Error('존재하지 않는 Todo입니다.');
  }

  const token = localStorage.getItem('token');
  const { data } = await customAxios.get<TodoResponse>(`/todos/${id}`, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
};

export const postTodo = async (todo: TodoInput): Promise<TodoResponse> => {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.post<TodoResponse>('/todos', todo, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
};

export const updateTodo = async ({
  id,
  todo,
}: {
  id: string;
  todo: TodoInput;
}): Promise<TodoResponse> => {
  const token = localStorage.getItem('token');
  const { data } = await customAxios.put<TodoResponse>(`/todos/${id}`, todo, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return data;
};

export const deleteTodo = async (id: string): Promise<string> => {
  const token = localStorage.getItem('token');
  await customAxios.delete(`/todos/${id}`, {
    headers: {
      Authorization: token ?? '',
    },
  });

  return id;
};

export default customAxios;
