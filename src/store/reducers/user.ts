import { combineReducers } from 'redux';

const id = (state: number = 0, action: DrammitAction): number => {
  switch (action.type) {
    case 'LOGIN':
    case 'SET_USER_INFO':
      return action.id;
    default:
      return state;
  }
};

const username = (state: string = '', action: DrammitAction): string => {
  switch (action.type) {
    case 'LOGIN':
    case 'SET_USER_INFO':
      return action.username;
    default:
      return state;
  }
};

const name = (state: string = '', action: DrammitAction): string => {
  switch (action.type) {
    case 'LOGIN':
    case 'SET_USER_INFO':
      return action.name || '';
    default:
      return state;
  }
};

const avatar = (state: string = '', action: DrammitAction): string => {
  switch (action.type) {
    case 'LOGIN':
    case 'SET_USER_INFO':
      return action.avatar || '';
    default:
      return state;
  }
};

export default combineReducers({
  avatar,
  id,
  name,
  username,
});
