import { dispatch } from '../store';

import { isLoading } from '../loader/selector';
import { fetch } from '../loader/actions';

export const getProfiles = (state: StoreShape) => state.profiles;

export const getProfile = (id: number) => (state: StoreShape) => {
  const profile = getProfiles(state)[id];

  if (typeof profile === 'undefined' && !isLoading('profiles', id)(state)) {
    dispatch(fetch('profiles', id));
  }

  return profile;
}
