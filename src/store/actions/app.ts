export const init = (): InitAction => ({
  type: 'APP_INIT',
});

export const setUserInfo = (
  id: number,
  username: string,
  name?: string,
  avatar?: string,
): SetUserInfoAction => ({
  avatar,
  id,
  name,
  type: 'SET_USER_INFO',
  username,
});

export const clearUserInfo = (): ClearUserInfoAction => ({
  type: 'CLEAR_USER_INFO',
});
