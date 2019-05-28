import { setJWT } from '../../core/jwt';

import { navigate } from '../../core/navigation';

import { clearUserInfo } from '../actions/app';

const listeners: DispatchListener[] = [
  {
    listener: () => {
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
