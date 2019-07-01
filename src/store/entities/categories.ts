import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [
  categories,
  getCategories,
  getCategory,
] = createLoader<StoreCategories, CategoryShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    name: '',
  },
  resolver: id => get(`/whisky/category/${id}`),
  table: 'categories',
});
