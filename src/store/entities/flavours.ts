import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [flavours, getFlavours, getFlavour] = createLoader<StoreFlavours, FlavourShape>({
  defaultValue: {},
  fallbackValue: {
    ParentFlavourId: 0,
    id: 0,
    name: '',
    usage: 0,
  },
  fetchTypes: ['FETCH_FLAVOURS_SUCCESS'],
  resolver: id => get(`/flavour/${id}`),
  table: 'flavours',
});
