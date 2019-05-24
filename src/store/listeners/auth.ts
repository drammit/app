import { ReduxListener } from 'redux-listeners';

import { navigate } from '../../core/navigation';

const listeners: { [type: string]: ReduxListener } = {
  LOGIN: () => {
    navigate('MainStack');
  },
};

export default listeners;
