import { createStore, applyMiddleware, compose } from 'redux';
import { createMiddleware } from 'redux-listeners';

import reducers from './reducers';
import listeners from './listeners';

export const listenMiddleware = createMiddleware();

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(listenMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

listeners(listenMiddleware);

export const dispatch = (action: DrammitAction) => {
  store.dispatch(action);
};

export default store;
