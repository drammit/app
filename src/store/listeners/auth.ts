import { ReduxListener } from 'redux-listeners';

const listeners: { [type: string]: ReduxListener } = {
  LOGIN: (dispatch, action) => {
    console.log(action);
  },
};

export default listeners;
