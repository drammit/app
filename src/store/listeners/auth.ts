import { setJWT } from '../../core/jwt';

import { navigate } from '../../core/navigation';
import { refreshToken } from '../../screens/Login/api';
import { info } from '../../core/log';
import { dispatch } from '../store';
import { logout } from '../actions/auth';

const listeners: DispatchListener[] = [
  {
    listener: () => {
      navigate('MainStack');
    },
    type: 'LOGIN',
  },
  {
    listener: () => {
      setJWT(null);
      navigate('AuthStack');
    },
    type: 'LOGOUT',
  },
  {
    listener: async () => {
      try {
        await refreshToken();
        info('Expired token successfully refreshed');
      } catch (err) {
        info('Expired token not refreshed');
        dispatch(logout());
      }
    },
    type: 'REFRESH_AUTH',
  },
];

export default listeners;
