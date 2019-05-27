import { post, get } from '../../core/fetch';

export const authenticate = (username: string, password: string) =>
  post('/user/authenticate', { username, password });
export const refreshToken = () => post('/user/refresh-token');
export const emailExists = (email: string) => get(`/user/exists?email=${email}`);
export const userExists = (username: string) => get(`/user/exists?username=${username}`);
