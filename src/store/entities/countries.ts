import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [countries, getCountries, getCountry] = createLoader<StoreCountries, StoreCountry>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/country/${id}`),
  table: 'countries',
});
