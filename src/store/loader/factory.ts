import { isLoading } from './selector';
import { fetch } from './actions';
import { registerResolver } from './listeners';
import { Dispatch, Reducer } from 'redux';

function createLoader<T>({
  table,
  defaultValue,
  pk = 'id',
  fetchTypes = [],
  resolver,
  reducer,
}: {
  table: string;
  pk?: string;
  defaultValue: T;
  fetchTypes?: string[];
  resolver: (id: string | number) => Promise<any>;
  reducer?: Reducer;
}): [
  (state: T | undefined, action: DrammitAction) => T,
  (state: StoreShape) => T,
  (key: number | string) => (state: StoreShape, dispatch: Dispatch) => any
] {
  // add resolver to listeners
  registerResolver(table, resolver);

  // create reducer
  const combinedReducer = (state: T = defaultValue, action: DrammitAction): T => {
    // Check for types to handle payload merging
    const handleAction = (action as any);

    if (
      fetchTypes.indexOf(handleAction.type) > -1
      && handleAction.payload
      && handleAction.payload[table]
    ) {
      return {
        ...state,
        ...handleAction.payload[table].reduce(
          (acc: {}, item: any) => ({
            ...acc,
            [item[pk]]: item,
          }),
          {},
        ),
      };
    }

    switch (action.type) {
      case 'LOADER_FETCH_FAILED':
        return action.table === table ? {
          ...state,
          [action.key]: action.error,
        } : state;
      case 'LOADER_FETCH_SUCCESS':
        return action.table === table ? {
          ...state,
          [action.key]: action.payload,
        } : state;
      default:
        return reducer ? reducer(state, action) : state;
    }
  };

  // create selector
  // @ts-ignore
  const getAll = (state: StoreShape): T => state[table];

  const getEntry = (key: number | string) => (state: StoreShape, dispatch: Dispatch) => {
    // @ts-ignore
    const entry = getAll(state)[key];

    if (typeof entry === 'undefined' && !isLoading(table, key)(state)) {
      return dispatch(fetch(table, key));
    }

    return entry;
  };

  return [combinedReducer, getAll, getEntry];
}

export default createLoader;
