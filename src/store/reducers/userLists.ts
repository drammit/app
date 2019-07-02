export const createUserListReducer = (
  listName: string,
) => (
  state: StoreUserLists = {},
  action: DrammitAction,
) => {
  switch (action.type) {
    case 'USER_LIST_ADD': {
      if (action.list !== listName) return state;

      return {
        ...state,
        [action.UserId]: {
          ...state[action.UserId],
          value: {
            ...state[action.UserId].value,
            items: [
              ...state[action.UserId].value.items.filter(id => id !== action.WhiskyId),
              action.WhiskyId,
            ],
          },
        },
      };
    }
    case 'USER_LIST_REMOVE': {
      if (action.list !== listName) return state;

      return {
        ...state,
        [action.UserId]: {
          ...state[action.UserId],
          value: {
            ...state[action.UserId].value,
            items: [
              ...state[action.UserId].value.items.filter(id => id !== action.WhiskyId),
            ],
          },
        },
      };
    }
    default:
      return state;
  }
};
