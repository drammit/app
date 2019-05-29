import { combineReducers, Reducer } from 'redux';

import loading from '../loader/reducer';
import user from './user';

export default (extraReducers?: { [key: string]: Reducer }) => combineReducers({
  ...extraReducers,
  loading,
  user,
});
