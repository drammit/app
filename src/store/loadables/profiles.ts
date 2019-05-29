import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [profiles, getProfiles, getProfile] = createLoader(
  'profiles',
  {},
  id => get(`/user/profile/${id}`),
);
