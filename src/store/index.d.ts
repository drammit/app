/* Redux Listener Types */
declare interface DispatchListener {
  type: string[] | string;
  listener: import('redux-listeners').ReduxListener;
}

/* All action types */
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
  from?: Date;
}

declare interface FetchTimelineRefreshAction {
  type: 'FETCH_TIMELINE_REFRESH';
  from?: Date;
}

declare interface FetchTimelineSuccessAction {
  type: 'FETCH_TIMELINE_SUCCESS';
  payload: TimelinePayload;
}

declare interface FetchUserTimelineSuccessAction {
  type: 'FETCH_USER_TIMELINE_SUCCESS';
  UserId: number;
  payload: TimelinePayload;
}

declare type DrammitAction = LoginAction | LogoutAction | InitAction | SetUserInfoAction
  | ClearUserInfoAction | FetchInformationAction | FetchInformationSuccessAction
  | FetchInformationFailedAction | RefreshAuthAction | FetchTimelineSuccessAction
  | FetchUserTimelineSuccessAction | FetchTimelineAction | FetchTimelineRefreshAction;

/* Shape of the store */

declare interface StoreCurrentUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
}

declare interface DramSlainteShape {
  UserId: number;
  createdAt: Date;
}

declare interface DramShape {
  UserId: number;
  WhiskyId: number;
  id: number;
  name: string;
  rating: number;
  slaintes: DramSlainteShape[];
  image?: string;
  message?: string;
  createdAt: Date;
}

declare type StoreDram = DramShape | undefined | Error;

declare interface StoreDrams {
  [key: number]: StoreDram;
}

declare interface UserShape {
  id: number;
  username: string;
  subscription: boolean;
  name?: string;
  avatar?: string;
}

declare type StoreUser = UserShape | undefined | Error;

declare interface StoreUsers {
  [key: number]: StoreUser;
}

declare interface WhiskyShape {
  DistilleryId: number;
  BottlerId: number;
  CategoryId: number;
  id: number;
  name: string;
  fullName: string;
  bottlingSerie: string;
  size: string;
  age: number;
  abv: number;
  year: string;
  image?: string;
}

declare type StoreWhisky = WhiskyShape | undefined | Error;

declare interface StoreWhiskies {
  [key: number]: StoreWhisky;
}

declare interface DistilleryShape {
  CountryId: number;
  RegionId: number;
  id: number;
  name: string;
  image?: string;
}

declare type StoreDistillery = DistilleryShape | undefined | Error;

declare interface StoreDistilleries {
  [key: number]: StoreDistillery;
}

declare interface ProfileShape extends UserShape {
  id: number;
  createdAt: Date;
  followers: number;
  following: number;
  drams: number;
}

declare type StoreProfile = ProfileShape | undefined | Error;

declare interface StoreProfiles {
  [key: number]: StoreProfile;
}

declare interface StoreLoading {
  [table: string]: (string|number)[];
}

declare interface StoreTimeline {
  loading: boolean;
  refreshing: boolean;
  items: DramShape['id'][];
}

declare interface StoreTimelines {
  [key: number]: StoreTimeline;
}

declare interface StoreShape {
  distilleries: StoreDistilleries;
  drams: StoreDrams;
  profiles: StoreProfiles;
  users: StoreUsers;
  whiskies: StoreWhiskies;
  user: StoreCurrentUser;
  loading: StoreLoading;
  timeline: StoreTimeline;
  timelines: StoreTimelines;
}
