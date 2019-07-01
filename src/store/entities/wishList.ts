import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [
  wishLists,
  getWishLists,
  getWishList,
] = createLoader<StoreUserLists, UserListShape>({
  defaultValue: {},
  fallbackValue: {
    UserId: 0,
    items: [],
  },
  pk: 'UserId',
  resolver: id => get(`/user-lists/wish-list/${id}`),
  table: 'wish-list',
});
