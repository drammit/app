import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [users, getUsers, getUser] = createLoader<StoreUsers, StoreUser>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/user/profile/${id}`),
  table: 'users',
});
