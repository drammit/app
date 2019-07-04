import { ReduxListenerMiddleware } from 'redux-listeners';

import auth from './auth';
import dram from './dram';
import flavour from './flavour';
import profile from './profile';
import timeline from './timeline';
import userLists from './userLists';
import loader from '../loader/listeners';

const createListeners = (listenMiddleware: ReduxListenerMiddleware) => {
  [
    ...auth,
    ...dram,
    ...flavour,
    ...loader,
    ...profile,
    ...timeline,
    ...userLists,
  ].forEach((listener) => {
    listenMiddleware.addListener(listener.type, listener.listener);
  });
};

export default createListeners;
