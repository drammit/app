import { ReduxListenerMiddleware } from 'redux-listeners';

import auth from './auth';

const createListeners = (listenMiddleware: ReduxListenerMiddleware) => {
  [
    auth,
  ].forEach((listeners) => {
    Object.keys(listeners).forEach(type => listenMiddleware.addListener(type, listeners[type]));
  });
};

export default createListeners;
