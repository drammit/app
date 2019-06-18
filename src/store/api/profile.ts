import { post } from '../../core/fetch';

export const followUser = (UserId: number) => post(`/user/${UserId}/follow`);
export const unfollowUser = (UserId: number) => post(`/user/${UserId}/unfollow`);
export const changeAvatar = (avatar?: FileUpload) => post('/user/avatar', { avatar });
export const changeName = (name: string) => post('/user/name', { name });
