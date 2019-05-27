import { ReduxListener } from 'redux-listeners';

import { setJWT } from '../../core/jwt';

import { navigate } from '../../core/navigation';

const listeners: { [type: string]: ReduxListener } = {
  LOGIN: () => {
    navigate('MainStack');
  },
  LOGOUT: () => {
    setJWT(null);
    navigate('AuthStack');
  },
};

export default listeners;
