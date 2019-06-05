import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [profiles, getProfiles, getProfile] = createLoader<StoreProfiles, StoreProfile>({
  defaultValue: {},
  resolver: id => get(`/user/profile/${id}`),
  table: 'profiles',
});
