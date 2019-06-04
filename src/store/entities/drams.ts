import createLoader from '../loader/factory';
import { get } from '../../core/fetch';

export const [drams, getDrams, getDram] = createLoader<StoreDrams>({
  defaultValue: {},
  fetchTypes: ['FETCH_TIMELINE_SUCCESS'],
  resolver: id => get(`/dram/${id}`),
  table: 'drams',
});
