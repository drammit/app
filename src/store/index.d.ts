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

declare type DrammitAction = LoginAction | LogoutAction | InitAction | SetUserInfoAction
  | ClearUserInfoAction;

/* Shape of the store */

declare interface StoreUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
}

declare interface StoreShape {
  user: StoreUser;
}
