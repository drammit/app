import { get } from '../../core/fetch';

type SearchFilter = 'all' | 'whisky' | 'distillery' | 'user';

export const searchQuery = (q: string, filter: SearchFilter) => get('/search', { q, filter });
