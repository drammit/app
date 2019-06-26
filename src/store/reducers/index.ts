import { combineReducers, Reducer } from 'redux';

import { countries } from '../entities/countries';
import { distilleries } from '../entities/distilleries';
import { drams } from '../entities/drams';
import { profiles } from '../entities/profiles';
import { regions } from '../entities/regions';
import { users } from '../entities/users';
import { whiskies } from '../entities/whiskies';

import loading from '../loader/reducer';
import user from './user';
import { singleReducer } from './timeline';
import timelines from './timelines';

export default (extraReducers?: { [key: string]: Reducer }) => combineReducers({
  ...extraReducers,
  countries,
  distilleries,
  drams,
  loading,
  profiles,
  regions,
  timeline: singleReducer,
  timelines,
  user,
  users,
  whiskies,
});
