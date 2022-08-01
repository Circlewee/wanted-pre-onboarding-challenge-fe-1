import axios from 'axios';

import { IUserInfo } from '@/types/types';

const customAxios = axios.create({
  baseURL: 'http://localhost%38080',
});

export async function loginRequest(data: IUserInfo) {
  return await customAxios.post('/users/login', data);
}

export default customAxios;
