import { combineReducers, Reducer } from 'redux';

import { bottlers } from '../entities/bottlers';
import { categories } from '../entities/categories';
import { collections } from '../entities/collections';
import { countries } from '../entities/countries';
import { distilleries } from '../entities/distilleries';
import { drams } from '../entities/drams';
import { profiles } from '../entities/profiles';
import { regions } from '../entities/regions';
import { users } from '../entities/users';
import { whiskies } from '../entities/whiskies';
import { wishLists } from '../entities/wishList';

import user from './user';
import { singleReducer } from './timeline';
import timelines from './timelines';

export default (
  extraReducers?: { [key: string]: Reducer<StoreShape, DrammitAction>,
}) => combineReducers({
  ...extraReducers,
  bottlers,
  categories,
  collection: collections,
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
  'wish-list': wishLists,
});
