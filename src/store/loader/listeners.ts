import { get } from '../../core/fetch';

import { fetchFailed, fetchSuccess } from './actions';

const resolvers: { [table: string]: (id: string | number) => Promise<any> } = {
  profiles(id: number | string) {
    return get(`/user/profile/${id}`);
  },
};

export const registerResolver = (
  table: string,
  resolver: (id: string | number) => Promise<any>,
) => {
  resolvers[table] = resolver;
};

const listeners: DispatchListener[] = [
  {
    listener: (dispatch, $action) => {
      const action = $action as FetchInformationAction;

      if (!action.key) return;

      resolvers[action.table](action.key)
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
