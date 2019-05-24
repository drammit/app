import { combineReducers } from 'redux';

const id = (state: number = 0, action: DrammitAction) => {
  return state;
};

const username = (state: string = '', action: DrammitAction) => {
  return state;
};

const name = (state: string = '', action: DrammitAction) => {
  return state;
};

const avatar = (state: string = '', action: DrammitAction) => {
  return state;
};

export default combineReducers({
  avatar,
  id,
  name,
  username,
});
