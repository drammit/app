import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

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
  resolver: id => get(`/user-lists/collection/${id}`),
  table: 'collections',
});
