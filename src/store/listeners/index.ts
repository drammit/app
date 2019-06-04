import { ReduxListenerMiddleware } from 'redux-listeners';

import auth from './auth';
import timeline from './timeline';
import loader from '../loader/listeners';

const createListeners = (listenMiddleware: ReduxListenerMiddleware) => {
  [
    ...auth,
    ...loader,
    ...timeline,
  ].forEach((listener) => {
    listenMiddleware.addListener(listener.type, listener.listener);
  });
};

export default createListeners;
