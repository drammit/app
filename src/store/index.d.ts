/* All action types */
declare interface InitAction {
  type: 'APP_INIT';
}

declare interface LoginAction {
  type: 'LOGIN';
}

declare interface LogoutAction {
  type: 'LOGOUT';
}

declare type DrammitAction = LoginAction | LogoutAction | InitAction;
