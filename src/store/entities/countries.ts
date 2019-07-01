import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [countries, getCountries, getCountry] = createLoader<StoreCountries, CountryShape>({
  defaultValue: {},
  fallbackValue: {
    id: 0,
    name: '',
  },
  resolver: id => get(`/distillery/country/${id}`),
  table: 'countries',
});
