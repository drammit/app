import { createStore, applyMiddleware, compose, Dispatch } from 'redux';
import { createMiddleware } from 'redux-listeners';

import reducers from './reducers';
import listeners from './listeners';

export const listenMiddleware = createMiddleware();

const middlewares = [
  applyMiddleware(listenMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

export const store = createStore<StoreShape, DrammitAction, any, any>(
  reducers({}),
  compose(...middlewares.filter(m => Boolean(m))),
);

listeners(listenMiddleware);

export const dispatch: Dispatch<DrammitAction> = (action) => {
  return store.dispatch(action);
};

export default store;
