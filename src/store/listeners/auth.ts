import { setJWT } from '../../core/jwt';

import { navigate } from '../../core/navigation';

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
];

export default listeners;
