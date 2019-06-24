import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [distilleries, getDistilleries, getDistillery] = createLoader<
  StoreDistilleries,
  StoreDistillery
>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS', 'SEARCH_RECEIVE'],
  resolver: id => get(`/distillery/${id}`),
  table: 'distilleries',
});
