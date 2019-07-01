import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [
  bottlers,
  getBottlers,
  getBottler,
] = createLoader<StoreBottlers, BottlerShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    name: '',
  },
  resolver: id => get(`/whisky/bottler/${id}`),
  table: 'bottlers',
});
