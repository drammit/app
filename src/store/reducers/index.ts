import { combineReducers, Reducer } from 'redux';

import { drams } from '../entities/drams';
import { profiles } from '../entities/profiles';
import { users } from '../entities/users';
import { whiskies } from '../entities/whiskies';

import loading from '../loader/reducer';
import user from './user';

export default (extraReducers?: { [key: string]: Reducer }) => combineReducers({
  ...extraReducers,
  drams,
  loading,
  profiles,
  user,
  users,
  whiskies,
});
