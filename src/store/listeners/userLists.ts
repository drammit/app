import { userListAdd, userListRemove } from '../api/userLists';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, action: any) => {
      userListAdd(action.list, action.WhiskyId);
    },
    type: ['USER_LIST_ADD'],
  },
  {
    listener: (dispatch, action: any) => {
      userListRemove(action.list, action.WhiskyId);
    },
    type: ['USER_LIST_REMOVE'],
  },
];

export default listeners;
