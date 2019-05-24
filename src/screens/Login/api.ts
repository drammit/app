import { post } from '../../core/fetch';

export const authenticate = (username: string, password: string) =>
  post('/user/authenticate', { username, password });

export const refreshToken = () => post('/user/refresh-token');
