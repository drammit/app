import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [whiskies, getWhiskies, getWhisky] = createLoader<WhiskyShape>({
  defaultValue: {},
  fallbackValue: {
    BottlerId: 0,
    CategoryId: 0,
    DistilleryId: 0,
    abv: 0,
    age: 0,
    bottlingSerie: '',
    fullName: '',
    id: 0,
    name: '',
    size: '',
    year: '',
  },
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/whisky/${id}`),
  table: 'whiskies',
});
