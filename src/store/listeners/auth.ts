import { setJWT } from '../../core/jwt';
import { navigate } from '../../core/navigation';
import { info } from '../../core/log';

import { refreshToken } from '../../screens/Login/api';

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
    listener: async (dispatch) => {
      try {
        await refreshToken();
        info('Expired token successfully refreshed');
      } catch (err) {
        info('Expired token not refreshed');

        if (err.name === 'FetchAuthError') {
          info('Refresh token invalid');
          dispatch(logout());
        }
      }
    },
    type: 'REFRESH_AUTH',
  },
];

export default listeners;
