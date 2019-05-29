import { createStore, applyMiddleware, compose } from 'redux';
import { createMiddleware } from 'redux-listeners';

import reducers from './reducers';
import listeners from './listeners';

import { profiles } from './loadables/profiles';

export const listenMiddleware = createMiddleware();

const middlewares = [
  applyMiddleware(listenMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

export const store = createStore(
  reducers({
    profiles,
  }),
  compose(...middlewares.filter(m => Boolean(m))),
);

listeners(listenMiddleware);

export const dispatch = (action: DrammitAction) => {
  store.dispatch(action);
};

export default store;
