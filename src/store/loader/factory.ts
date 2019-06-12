import { isLoading } from './selector';
import { fetch } from './actions';
import { registerResolver } from './listeners';
import { Dispatch, Reducer } from 'redux';

/**
 * T: Type of table shape
 * E: Type of table entry shape
 */
function createLoader<T, E>({
  table,
  defaultValue,
  pk = 'id',
  fetchTypes = [],
  resolver,
  reducer,
}: {
  table: string;
  defaultValue: T;
  pk?: string;
  fetchTypes?: string[];
  resolver: (id: string | number) => Promise<any>;
  reducer?: Reducer;
  many?: boolean;
}): [
  (state: T, action: DrammitAction) => T,
  (state: StoreShape) => T,
  (key: number | string) => (state: StoreShape, dispatch: Dispatch) => E
] {
  // add resolver to listeners
  registerResolver(table, resolver);

  // create reducer
  const combinedReducer = (state: T = defaultValue, action: DrammitAction): T => {
    // Handle failed fetches
    if (action.type === 'LOADER_FETCH_FAILED') {
      return action.table === table ? {
        ...state,
        [action.key]: action.error,
      } : state;
    }

    // Merge API results with state
    const handleAction = (action as any);

    if (
      [...fetchTypes, 'LOADER_FETCH_SUCCESS'].indexOf(handleAction.type) > -1
      && handleAction.payload
      && handleAction.payload[table]
      && handleAction.payload[table].length > 0
    ) {
      return {
        ...state,
        ...handleAction.payload[table].reduce(
          (acc: T, item: E) => ({
            ...acc,
            // @ts-ignore
            [item[pk]]: item,
          }),
          {},
        ),
      };
    }

    // apply reducer if any, or return current state;
    return reducer ? reducer(state, action) : state;
  };

  // create selector
  // @ts-ignore
  const getAll = (state: StoreShape): T => state[table];

  const getEntry = (key?: number | string) => (state: StoreShape, dispatch: Dispatch) => {
    if (!key) return undefined;

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
