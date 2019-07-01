import { combineReducers, Reducer } from 'redux';

import { bottlers } from '../entities/bottlers';
import { categories } from '../entities/categories';
import { countries } from '../entities/countries';
import { distilleries } from '../entities/distilleries';
import { drams } from '../entities/drams';
import { profiles } from '../entities/profiles';
import { regions } from '../entities/regions';
import { users } from '../entities/users';
import { whiskies } from '../entities/whiskies';

import user from './user';
import { singleReducer } from './timeline';
import timelines from './timelines';

export default (
  extraReducers?: { [key: string]: Reducer<StoreShape, DrammitAction>,
}) => combineReducers({
  ...extraReducers,
  bottlers,
  categories,
  countries,
  distilleries,
  drams,
  profiles,
  regions,
  timeline: singleReducer,
  timelines,
  user,
  users,
  whiskies,
});
