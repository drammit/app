import { get } from '../../core/fetch';

export const getDrams = (from: Date = new Date()) => get(`/dram/list?from=${+from}`);
