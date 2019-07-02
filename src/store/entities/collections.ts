import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

import { createUserListReducer } from '../reducers/userLists';

export const [
  collections,
  getCollections,
  getCollection,
] = createLoader<StoreUserLists, UserListShape>({
  defaultValue: {},
  fallbackValue: {
    UserId: 0,
    items: [],
  },
  pk: 'UserId',
  reducer: createUserListReducer('collection'),
  resolver: id => get(`/user-lists/collection/${id}`),
  table: 'collection',
});
