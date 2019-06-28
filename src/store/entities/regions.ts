import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [regions, getRegions, getRegion] = createLoader<StoreRegions, RegionShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    name: '',
  },
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/distillery/region/${id}`),
  table: 'regions',
});
