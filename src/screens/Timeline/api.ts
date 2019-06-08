import { get } from '../../core/fetch';

export const getDrams = (from?: number) => get(`/dram/list?from=${from}`);
