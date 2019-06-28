import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [countries, getCountries, getCountry] = createLoader<StoreCountries, CountryShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    name: '',
  },
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/country/${id}`),
  table: 'countries',
});
