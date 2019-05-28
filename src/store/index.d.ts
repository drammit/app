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

declare type DrammitAction = LoginAction | LogoutAction | InitAction | SetUserInfoAction
  | ClearUserInfoAction | FetchInformationAction | FetchInformationSuccessAction
  | FetchInformationFailedAction;

/* Shape of the store */

declare interface StoreUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
}

declare interface ProfileShape {
  id: number;
  username: string;
  name?: string;
  avatar?: string;
}

declare type StoreProfile = ProfileShape | undefined | Error;

declare interface StoreProfiles {
  [key: number]: StoreProfile;
}

declare interface StoreLoading {
  [table: string]: (string|number)[];
}

declare interface StoreShape {
  user: StoreUser;
  loading: StoreLoading;
  profiles: StoreProfiles;
}
