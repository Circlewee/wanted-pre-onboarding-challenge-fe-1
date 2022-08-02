import axios from 'axios';

import { IUserRequestSuccess, IUserInfo } from '@/types/types';
import { ITodoListResponse } from '@/types/todoTypes';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

// customAxios.interceptors.response()

export async function loginRequest(userInfo: IUserInfo): Promise<IUserRequestSuccess> {
  const { data } = await customAxios.post<IUserRequestSuccess>('/users/login', userInfo);
  return data;
}

export async function registerRequest(userInfo: IUserInfo): Promise<IUserRequestSuccess> {
  const { data } = await customAxios.post<IUserRequestSuccess>('/users/create', userInfo);
  return data;
}

export async function getTodoList(): Promise<ITodoListResponse> {
  const { data } = await customAxios.get<ITodoListResponse>('/todos');
  return data;
}

export default customAxios;
