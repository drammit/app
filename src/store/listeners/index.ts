import { ReduxListenerMiddleware } from 'redux-listeners';

import auth from './auth';
import loader from '../loader/listeners';

const createListeners = (listenMiddleware: ReduxListenerMiddleware) => {
  [
    ...auth,
    ...loader,
  ].forEach((listener) => {
    listenMiddleware.addListener(listener.type, listener.listener);
  });
};

export default createListeners;
