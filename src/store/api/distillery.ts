import { get } from '../../core/fetch';

export const getPopularWhiskies = (id: number) => get(`/distillery/${id}/popular`);
