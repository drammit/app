import { combineReducers } from 'redux';

import loading from '../loader/reducer';
import profiles from './profiles';
import user from './user';

export default combineReducers({
  loading,
  profiles,
  user,
});
