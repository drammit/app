import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [whiskies, getWhiskies, getWhisky] = createLoader<StoreWhiskies, StoreWhisky>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/whisky/${id}`),
  table: 'whiskies',
});
