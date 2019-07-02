export const addToList = (list: string, UserId: number, WhiskyId: number): UserListAddAction => ({
  UserId,
  WhiskyId,
  list,
  type: 'USER_LIST_ADD',
});

export const removeFromList = (
  list: string,
  UserId: number,
  WhiskyId: number,
): UserListRemoveAction => ({
  UserId,
  WhiskyId,
  list,
  type: 'USER_LIST_REMOVE',
});
