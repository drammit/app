declare interface InitAction {
  type: 'APP_INIT';
}

declare interface LoginAction {
  type: 'LOGIN';
  id: number;
  username: string;
  name?: string;
  avatar?: string;
}

declare interface LogoutAction {
  type: 'LOGOUT';
}

declare interface RefreshAuthAction {
  type: 'REFRESH_AUTH';
}

declare interface SetUserInfoAction {
  type: 'SET_USER_INFO';
  id: number;
  username: string;
  name?: string;
  avatar?: string;
}

declare interface ClearUserInfoAction {
  type: 'CLEAR_USER_INFO';
}

declare interface FetchInformationAction {
  type: 'LOADER_FETCH';
  key: string | number;
  table: string;
}

declare interface FetchInformationSuccessAction {
  type: 'LOADER_FETCH_SUCCESS';
  key: string | number;
  table: string;
  payload: any;
}

declare interface FetchInformationFailedAction {
  type: 'LOADER_FETCH_FAILED';
  key: string | number;
  table: string;
  error: Error;
}

declare interface ExtraInformationAction {
  type: 'EXTRA_INFORMATION';
  payload: any;
}

declare interface TimelinePayload {
  drams: DramShape[];
}

declare interface FetchTimelineAction {
  UserId?: number;
  from?: number;
  type: 'FETCH_TIMELINE';
}

declare interface FetchTimelineRedoAction {
  type: 'FETCH_TIMELINE_REDO';
}

declare interface FetchTimelineRefreshAction {
  UserId?: number;
  type: 'FETCH_TIMELINE_REFRESH';
  until: number;
}

declare interface FetchTimelineSuccessAction {
  type: 'FETCH_TIMELINE_SUCCESS';
  UserId?: number;
  payload: TimelinePayload;
}

declare interface FetchTimelineRefreshSuccessAction {
  type: 'FETCH_TIMELINE_REFRESH_SUCCESS';
  UserId?: number;
  payload: TimelinePayload;
}

declare interface DramSlainteAction {
  type: 'DRAM_SLAINTE';
  DramId: number;
  UserId: number;
}

declare interface DramCommentAction {
  type: 'DRAM_COMMENT';
  DramId: number;
  UserId: number;
  comment: string;
  id: number;
}

declare interface DramAddAction {
  type: 'DRAM_ADD';
  dram: DramShape;
}

declare interface DramCommentReplaceAction {
  type: 'DRAM_COMMENT_REPLACE';
  DramId: number;
  id: number;
  comment: DramCommentShape;
}

declare interface ProfileFollowAction {
  type: 'PROFILE_FOLLOW';
  UserId: number;
}

declare interface ProfileUnfollowAction {
  type: 'PROFILE_UNFOLLOW';
  UserId: number;
}

declare interface ProfileUpdateAvatarAction {
  avatar: string;
  type: 'PROFILE_UPDATE_AVATAR';
}

declare interface ProfileUpdateNameAction {
  name: string;
  type: 'PROFILE_UPDATE_NAME';
}

declare interface SearchResult {
  id: number;
  type: 'whisky' | 'user' | 'distillery';
}

declare interface SearchReceive {
  payload: any;
  results: SearchResult[];
  type: 'SEARCH_RECEIVE';
}

declare interface UserListAddAction {
  UserId: number;
  WhiskyId: number;
  list: string;
  type: 'USER_LIST_ADD';
}

declare interface UserListRemoveAction {
  UserId: number;
  WhiskyId: number;
  list: string;
  type: 'USER_LIST_REMOVE';
}

declare interface FetchFlavoursAction {
  type: 'FETCH_FLAVOURS';
}

declare interface FetchFlavoursSuccessAction {
  type: 'FETCH_FLAVOURS_SUCCESS';
  payload: {
    flavours: FlavourShape[];
  };
}

declare interface FetchFlavoursFailedAction {
  type: 'FETCH_FLAVOURS_FAILED';
}

declare interface UploadDramPhoto {
  type: 'UPLOAD_DRAM_PHOTO';
  id: number;
  uri: string;
}

declare interface UploadDramPhotoSuccess {
  type: 'UPLOAD_DRAM_PHOTO_SUCCESS';
  id: number;
  image: string;
}

declare interface UploadDramPhotoFailed {
  type: 'UPLOAD_DRAM_PHOTO_FAILED';
  id: number;
}

declare type DrammitAction = LoginAction | LogoutAction | InitAction | SetUserInfoAction
  | ClearUserInfoAction | FetchInformationAction | FetchInformationSuccessAction
  | FetchInformationFailedAction | RefreshAuthAction | FetchTimelineSuccessAction
  | FetchTimelineAction | FetchTimelineRefreshAction | DramSlainteAction | DramCommentAction
  | DramCommentReplaceAction | FetchTimelineRefreshSuccessAction | ProfileFollowAction
  | ProfileUnfollowAction | FetchTimelineRedoAction | ProfileUpdateAvatarAction
  | ProfileUpdateNameAction | SearchReceive | ExtraInformationAction | UserListAddAction
  | UserListRemoveAction | FetchFlavoursAction | FetchFlavoursSuccessAction
  | FetchFlavoursFailedAction | DramAddAction | UploadDramPhoto | UploadDramPhotoSuccess
  | UploadDramPhotoFailed;
