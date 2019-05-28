import { setJWT, getJWTPayload } from '../../core/jwt';

import { navigate } from '../../core/navigation';

import { setUserInfo, clearUserInfo } from '../actions/app';

const listeners: DispatchListener[] = [
  {
    listener: (dispatch) => {
      const user = getJWTPayload();
      dispatch(setUserInfo(user.id, user.username, user.name, user.avatar));

      navigate('MainStack');
    },
    type: 'LOGIN',
  },
  {
    listener: (dispatch) => {
      setJWT(null);
      dispatch(clearUserInfo());

      navigate('AuthStack');
    },
    type: 'LOGOUT',
  },
];

export default listeners;
