import { isLoading } from './selector';
import { fetch } from './actions';
import { registerResolver } from './listeners';
import { Dispatch, Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
  (state: T | undefined, action: DrammitAction) => T,
  (state: StoreShape) => T,
  (key: number | string) => E
] {
  // add resolver to listeners
  registerResolver(table, resolver);

  // create reducer
  const combinedReducer = (state: T | undefined = defaultValue, action: DrammitAction): T => {
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

  const getEntry = (key?: number | string) => {
    if (!key) return undefined;

    const dispatch = useDispatch();

    // @ts-ignore
    const entry = useSelector(getAll)[key];
    const loading = useSelector(isLoading(table, key));

    useEffect(
      () => {
        if (typeof entry === 'undefined' && !loading) dispatch(fetch(table, key));
      },
      [entry, loading],
    );

    return entry;
  };

  return [combinedReducer, getAll, getEntry];
}

export default createLoader;
