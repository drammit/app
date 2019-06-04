import { combineReducers, Reducer } from 'redux';

import { drams } from '../entities/drams';
import { profiles } from '../entities/profiles';
import { users } from '../entities/users';
import { whiskies } from '../entities/whiskies';

import loading from '../loader/reducer';
import user from './user';
import timeline from './timeline';
import timelines from './timelines';

export default (extraReducers?: { [key: string]: Reducer }) => combineReducers({
  ...extraReducers,
  drams,
  loading,
  profiles,
  timeline,
  timelines,
  user,
  users,
  whiskies,
});
