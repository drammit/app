import { get } from '../../core/fetch';

import { fetchFailed, fetchSuccess } from './actions';

const fetcher: { [table: string]: (id: string | number) => any } = {
  profiles(id: number | string) {
    return get(`/user/profile/${id}`);
  },
};

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, $action) => {
      const action = $action as FetchInformationAction;

      if (!action.key) return;

      fetcher[action.table](action.key)
        .then((response: any) => {
          dispatch(fetchSuccess(action.table, action.key, response));
        })
        .catch((e: Error) => {
          dispatch(fetchFailed(action.table, action.key, e));
        });
    },
    type: 'LOADER_FETCH',
  },
];

export default listeners;
