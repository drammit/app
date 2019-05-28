import { ReduxListenerMiddleware } from 'redux-listeners';

import auth from './auth';

const createListeners = (listenMiddleware: ReduxListenerMiddleware) => {
  [
    ...auth,
  ].forEach((listener) => {
    listenMiddleware.addListener(listener.type, listener.listener);
  });
};

export default createListeners;
