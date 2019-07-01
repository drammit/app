import { get } from '../../core/fetch';

export const searchQuery = (
  q: string,
  filter: SearchFilter,
  page: number = 1,
) => get('/search', { q, filter, page });
