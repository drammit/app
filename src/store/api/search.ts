import { get } from '../../core/fetch';

export const searchQuery = (q: string, filter: SearchFilter) => get('/search', { q, filter });
