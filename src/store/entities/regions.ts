import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [regions, getRegions, getRegion] = createLoader<StoreRegions, RegionShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    name: '',
  },
  resolver: id => get(`/distillery/region/${id}`),
  table: 'regions',
});
