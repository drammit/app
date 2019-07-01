import { get } from '../../core/fetch';

export const getWhiskyScore = (id: number) => get(`/whisky/${id}/score`);
