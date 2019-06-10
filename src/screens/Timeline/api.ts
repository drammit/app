import { stringify } from 'query-string';

import { get } from '../../core/fetch';

interface GetDramsParams { from?: number; until?: number; }

export const getDrams = (params: GetDramsParams) => get(`/dram/list?${stringify(params)}`);
