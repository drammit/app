import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [regions, getRegions, getRegion] = createLoader<StoreRegions, StoreRegion>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/region/${id}`),
  table: 'regions',
});
