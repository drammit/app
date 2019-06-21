import { post, get } from '../../core/fetch';

export const authenticate = (username: string, password: string) =>
  post('/user/authenticate', { username, password });
export const refreshToken = () => post('/user/refresh-token');
export const emailExists = (email: string) => get('/user/exists', { email });
export const userExists = (username: string) => get('/user/exists', { username });
export const registerUser = (
  email: string,
  password: string,
  username: string,
  fullName?: string,
  avatar?: FileUpload,
  facebookId?: string,
) => {
  return post('/user/register', {
    avatar,
    email,
    facebookId,
    fullName,
    password,
    username,
  });
};
