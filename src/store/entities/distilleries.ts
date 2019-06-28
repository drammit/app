import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [distilleries, getDistilleries, getDistillery] = createLoader<DistilleryShape>({
  defaultValue: {},
  fallbackValue: {
    CountryId: 0,
    RegionId: 0,
    id: 0,
    name: '',
  },
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/distillery/${id}`),
  table: 'distilleries',
});
