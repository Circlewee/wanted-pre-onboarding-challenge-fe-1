import axios from 'axios';

import { IUserRequestSuccess, IUserInfo } from '@/types/types';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function loginRequest(userInfo: IUserInfo): Promise<IUserRequestSuccess> {
  const { data } = await customAxios.post('/users/login', userInfo);
  return data;
}

export async function registerRequest(userInfo: IUserInfo): Promise<IUserRequestSuccess> {
  const { data } = await customAxios.post<IUserRequestSuccess>('/users/create', userInfo);
  return data;
}

export default customAxios;
