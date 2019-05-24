/* All action types */
declare interface InitAction {
  type: 'APP_INIT';
}

declare interface LoginAction {
  type: 'LOGIN';
}

declare type DrammitAction = LoginAction | InitAction;
