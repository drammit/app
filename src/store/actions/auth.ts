import { getJWTPayload } from '../../core/jwt';

export const login = (): LoginAction => {
  const { id, username, name, avatar } = getJWTPayload();

  return {
    avatar,
    id,
    name,
    type: 'LOGIN',
    username,
  };
};

export const logout = (): LogoutAction => ({
  type: 'LOGOUT',
});

export const refreshAuth = (): RefreshAuthAction => ({
  type: 'REFRESH_AUTH',
});
