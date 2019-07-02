import { post } from '../../core/fetch';

export const userListAdd = (list: string, WhiskyId: number) => post(
  `/user-lists/${list}/add`,
  {
    WhiskyId,
  },
);

export const userListRemove = (list: string, WhiskyId: number) => post(
  `/user-lists/${list}/remove`,
  {
    WhiskyId,
  },
);
