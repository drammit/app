import { get, post } from '../../core/fetch';

interface GetDramsParams {
  from?: number;
  until?: number;
  UserId?: number;
}

interface DramData {
  message?: string;
  rating: number;
  flavours: number[];
  WhiskyId: number;
  name: string;
}

export const getDrams = (params: GetDramsParams) => get('/dram/list', params);
export const slainteDram = (DramId: number) => post(`/dram/${DramId}/slainte`);
export const reportDram = (DramId: number) => post(`/dram/${DramId}/report`);
export const commentDram = (DramId: number, comment: string) => post(
  `/dram/${DramId}/comment`,
  { comment },
);
export const postDram = (data: DramData) => post('/dram', { ...data });
export const uploadDram = (id: number, image?: FileUpload) => post(`/dram/${id}/upload`, { image });
export const removeDram = (id: number) => post(`/dram/${id}/remove`);
