import { stringify } from 'query-string';

import { get, post } from '../../core/fetch';

interface GetDramsParams { from?: number; until?: number; }

export const getDrams = (params: GetDramsParams) => get(`/dram/list?${stringify(params)}`);
export const slainteDram = (DramId: number) => post(`/dram/${DramId}/slainte`);
export const commentDram = (DramId: number, comment: string) => post(
  `/dram/${DramId}/comment`,
  { comment },
);
