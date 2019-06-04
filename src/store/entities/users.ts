import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [users, getUsers, getUser] = createLoader<StoreUsers>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS'],
  resolver: id => get(`/user/profile/${id}`),
  table: 'users',
});
