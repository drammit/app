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

declare interface TimelinePayload {
  drams: DramShape[];
}

declare interface FetchTimelineAction {
  type: 'FETCH_TIMELINE';
  from?: number;
}

declare interface FetchTimelineRedoAction {
  type: 'FETCH_TIMELINE_REDO';
}

declare interface FetchTimelineRefreshAction {
  type: 'FETCH_TIMELINE_REFRESH';
  until?: number;
}

declare interface FetchTimelineSuccessAction {
  type: 'FETCH_TIMELINE_SUCCESS';
  payload: TimelinePayload;
}

declare interface FetchTimelineRefreshSuccessAction {
  type: 'FETCH_TIMELINE_REFRESH_SUCCESS';
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

declare type DrammitAction = LoginAction | LogoutAction | InitAction | SetUserInfoAction
  | ClearUserInfoAction | FetchInformationAction | FetchInformationSuccessAction
  | FetchInformationFailedAction | RefreshAuthAction | FetchTimelineSuccessAction
  | FetchTimelineAction | FetchTimelineRefreshAction | DramSlainteAction | DramCommentAction
  | DramCommentReplaceAction | FetchTimelineRefreshSuccessAction | ProfileFollowAction
  | ProfileUnfollowAction | FetchTimelineRedoAction;
