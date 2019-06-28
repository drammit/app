import { fetch } from './actions';
import { registerResolver } from './listeners';
import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

/**
 * E: Type of table entry shape
 */
function createLoader<E>({
  table,
  defaultValue,
  fallbackValue,
  pk = 'id',
  fetchTypes = [],
  resolver,
  reducer,
}: {
  table: string;
  defaultValue: { [key: string]: StoreResolvable<E> };
  fallbackValue: E;
  pk?: string;
  fetchTypes?: string[];
  resolver: (id: string | number) => Promise<any>;
  reducer?: Reducer<{ [key: string]: StoreResolvable<E> }, DrammitAction>;
  many?: boolean;
}): [
  (
    state: { [key: string]: StoreResolvable<E> } | undefined,
    action: DrammitAction,
  ) => { [key: string]: StoreResolvable<E> },
  (state: StoreShape) => { [key: string]: StoreResolvable<E> },
  (key?: number | string) => StoreResolvable<E>
] {
  // add resolver to listeners
  registerResolver(table, resolver);

  // create reducer
  const combinedReducer = (
    state: { [key: string]: StoreResolvable<E> } | undefined = defaultValue,
    action: DrammitAction): { [key: string]: StoreResolvable<E>,
  } => {
    // Handle failed fetches
    if (action.type === 'LOADER_FETCH_FAILED') {
      return action.table === table ? {
        ...state,
        [action.key]: {
          error: {
            ...action.error,
            type: 'LoadError',
          },
          isPending: false,
          isResolved: true,
          value: fallbackValue,
        },
      } : state;
    }

    if (action.type === 'LOADER_FETCH') {
      return action.table === table ? {
        ...state,
        [action.key]: {
          isPending: true,
          isResolved: false,
          value: fallbackValue,
        },
      } : state;
    }

    // Merge API results with state
    const handleAction = (action as any);

    if (
      [...fetchTypes, 'LOADER_FETCH_SUCCESS', 'EXTRA_INFORMATION'].indexOf(handleAction.type) > -1
      && handleAction.payload
      && handleAction.payload[table]
      && handleAction.payload[table].length > 0
    ) {
      return {
        ...state,
        ...handleAction.payload[table].reduce(
          (
            acc: { [key: string]: StoreResolvable<E> },
            item: E,
          ): { [key: string]: StoreResolvable<E> } => ({
            ...acc,
            // @ts-ignore
            [item[pk] || '']: {
              isPending: false,
              isResolved: true,
              value: item,
            },
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
  const getAll = (state: StoreShape) => state[table];

  const getEntry = (key?: number | string): StoreResolvable<E> => {
    const dispatch = useDispatch();

    // @ts-ignore
    const entry = useSelector(getAll)[key];

    useEffect(
      () => {
        if (key && (typeof entry === 'undefined' || (!entry.isResolved && !entry.isPending))) {
          dispatch(fetch(table, key));
        }
      },
      [entry, key],
    );

    const value = entry ? entry.value : fallbackValue;
    const isPending = entry ? entry.isPending : false;
    const isResolved = entry ? entry.isResolved : false;
    const error = entry ? entry.error : undefined;

    return { value, isPending, isResolved, error };
  };

  return [combinedReducer, getAll, getEntry];
}

export default createLoader;
