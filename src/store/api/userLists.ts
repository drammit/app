import { post } from '../../core/fetch';

export const userListAdd = (list: string, UserId: number, WhiskyId: number) => post(
  `/user-lists/${list}/add`,
  {
    UserId,
    WhiskyId,
  },
);

export const userListRemove = (list: string, UserId: number, WhiskyId: number) => post(
  `/user-lists/${list}/remove`,
  {
    UserId,
    WhiskyId,
  },
);
