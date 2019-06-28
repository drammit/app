import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [users, getUsers, getUser] = createLoader<StoreUsers, UserShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    subscription: false,
    username: '',
  },
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/user/profile/${id}`),
  table: 'users',
});
